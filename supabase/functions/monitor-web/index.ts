import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import { GoogleAuth } from "npm:google-auth-library@9.6.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables');
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    let tasks = ['ga4_today', 'ga4_7days', 'speed', 'uptime'];
    try {
      if (req.body) {
        const body = await req.json();
        if (body.tasks && Array.isArray(body.tasks)) {
          tasks = body.tasks;
        }
      }
    } catch (e) {
      // Ignore JSON parse errors, just use defaults
    }

    const results: Record<string, any> = {};

    // 1. Uptime Check
    if (tasks.includes('uptime')) {
      try {
        const start = Date.now();
        const res = await fetch('https://www.nexcy.lk');
        const duration = Date.now() - start;
        
        const status = res.ok ? 'up' : 'down';
        
        const { error } = await supabase.from('uptime_checks').insert({
          url: 'https://www.nexcy.lk',
          status,
          status_code: res.status,
          response_time_ms: duration,
        });
        
        if (error) throw error;
        results.uptime = { status, status_code: res.status, duration };
      } catch (err: any) {
        console.error('Uptime check failed:', err);
        results.uptime = { error: err.message };
      }
    }

    // 2. PageSpeed Insights
    if (tasks.includes('speed')) {
      try {
        const apiKey = Deno.env.get('PAGESPEED_API_KEY');
        if (!apiKey) throw new Error('PAGESPEED_API_KEY is not set');

        const runStrategy = async (strategy: 'mobile' | 'desktop') => {
          const url = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://www.nexcy.lk&strategy=${strategy}&key=${apiKey}&category=performance&category=accessibility&category=best-practices&category=seo`;
          const res = await fetch(url);
          if (!res.ok) throw new Error(`PageSpeed API failed for ${strategy}: ${res.statusText}`);
          const data = await res.json();
          
          const getScore = (cat: string) => {
            const score = data.lighthouseResult?.categories?.[cat]?.score;
            return score !== undefined ? Math.round(score * 100) : null;
          };
          
          const audits = data.lighthouseResult?.audits || {};
          const lcp_ms = audits['largest-contentful-paint']?.numericValue || null;
          const cls = audits['cumulative-layout-shift']?.numericValue || null;
          const inp_ms = audits['interactive']?.numericValue || null; 
          
          const { error } = await supabase.from('speed_snapshots').insert({
            url: 'https://www.nexcy.lk',
            strategy,
            performance_score: getScore('performance'),
            accessibility_score: getScore('accessibility'),
            seo_score: getScore('seo'),
            best_practices_score: getScore('best-practices'),
            lcp_ms,
            cls,
            inp_ms
          });

          if (error) throw error;
        };

        await runStrategy('mobile');
        await runStrategy('desktop');
        results.speed = { status: 'success' };
      } catch (err: any) {
        console.error('Speed check failed:', err);
        results.speed = { error: err.message };
      }
    }

    // 3. GA4 Reports
    if (tasks.includes('ga4_today') || tasks.includes('ga4_7days')) {
      try {
        const serviceAccountJsonStr = Deno.env.get('GA4_SERVICE_ACCOUNT_JSON');
        const propertyId = Deno.env.get('GA4_PROPERTY_ID');
        
        if (!serviceAccountJsonStr || !propertyId) {
          throw new Error('GA4 credentials or property ID missing');
        }

        const credentials = JSON.parse(serviceAccountJsonStr);
        const auth = new GoogleAuth({
          credentials,
          scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
        });
        
        const client = await auth.getClient();
        const tokenResponse = await client.getAccessToken();
        const accessToken = tokenResponse?.token || tokenResponse;
        
        const runReport = async (startDate: string, endDate: string, period: string) => {
          const body = {
            dateRanges: [{ startDate, endDate }],
            metrics: [
              { name: 'activeUsers' },
              { name: 'screenPageViews' },
              { name: 'sessions' },
              { name: 'averageSessionDuration' },
              { name: 'bounceRate' }
            ]
          };

          const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          });
          
          if (!res.ok) {
            const errBody = await res.text();
            throw new Error(`GA4 API error: ${errBody}`);
          }
          
          const data = await res.json();
          const row = data.rows?.[0]?.metricValues || [];
          
          // Top pages report
          const pagesBody = {
            dateRanges: [{ startDate, endDate }],
            metrics: [{ name: 'screenPageViews' }],
            dimensions: [{ name: 'pagePath' }],
            limit: 10
          };
          
          const pagesRes = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(pagesBody)
          });
          
          const pagesData = await pagesRes.json();
          const topPages = (pagesData.rows || []).map((r: any) => ({
            path: r.dimensionValues?.[0]?.value || 'unknown',
            views: parseInt(r.metricValues?.[0]?.value || '0', 10)
          }));

          const { error } = await supabase.from('analytics_snapshots').insert({
            period,
            active_users: parseInt(row[0]?.value || '0', 10),
            page_views: parseInt(row[1]?.value || '0', 10),
            sessions: parseInt(row[2]?.value || '0', 10),
            avg_session_duration: parseFloat(row[3]?.value || '0'),
            bounce_rate: parseFloat(row[4]?.value || '0'),
            top_pages: topPages
          });

          if (error) throw error;
        };

        if (tasks.includes('ga4_today')) {
          await runReport('today', 'today', 'today');
          results.ga4_today = { status: 'success' };
        }
        if (tasks.includes('ga4_7days')) {
          await runReport('7daysAgo', 'today', '7days');
          results.ga4_7days = { status: 'success' };
        }
      } catch (err: any) {
        console.error('GA4 check failed:', err);
        results.ga4 = { error: err.message };
      }
    }

    return new Response(JSON.stringify({ success: true, results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error: any) {
    console.error('Function error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
