-- Create tables for web monitoring

CREATE TABLE IF NOT EXISTS analytics_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  period text NOT NULL, -- 'today', 'yesterday', '7days', '30days'
  active_users int,
  page_views int,
  sessions int,
  avg_session_duration numeric,
  bounce_rate numeric,
  top_pages jsonb, -- array of {path, views}
  captured_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS speed_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  strategy text NOT NULL, -- 'mobile' or 'desktop'
  performance_score int,
  accessibility_score int,
  seo_score int,
  best_practices_score int,
  lcp_ms numeric,
  cls numeric,
  inp_ms numeric,
  captured_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS uptime_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  status text NOT NULL, -- 'up' or 'down'
  status_code int,
  response_time_ms int,
  checked_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE analytics_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE speed_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE uptime_checks ENABLE ROW LEVEL SECURITY;

-- Authenticated-only SELECT policies
CREATE POLICY "Enable read access for authenticated users" ON analytics_snapshots FOR SELECT TO authenticated USING (true);
CREATE POLICY "Enable read access for authenticated users" ON speed_snapshots FOR SELECT TO authenticated USING (true);
CREATE POLICY "Enable read access for authenticated users" ON uptime_checks FOR SELECT TO authenticated USING (true);

-- Extensions for Cron
-- Note: These might require superuser privileges or manual activation via the Supabase Dashboard
CREATE EXTENSION IF NOT EXISTS pg_net;
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- CRON SCHEDULING EXAMPLES (Uncomment and replace placeholders to apply via SQL)
-- In production, replace `YOUR_PROJECT_REF` and `YOUR_ANON_KEY` with actual values.

-- 1. Uptime and Speed checks: Every 4 hours
-- SELECT cron.schedule(
--   'monitor-web-speed-uptime',
--   '0 0,4,8,12,16,20 * * *',
--   $$
--   SELECT net.http_post(
--       url:='https://YOUR_PROJECT_REF.supabase.co/functions/v1/monitor-web',
--       headers:='{"Content-Type": "application/json", "Authorization": "Bearer YOUR_ANON_KEY"}'::jsonb,
--       body:='{"tasks": ["uptime", "speed"]}'::jsonb
--   ) as request_id;
--   $$
-- );

-- 2. GA4 'today' snapshot: Twice daily (e.g., at 12:00 and 23:00)
-- SELECT cron.schedule(
--   'monitor-web-ga4-today',
--   '0 12,23 * * *',
--   $$
--   SELECT net.http_post(
--       url:='https://YOUR_PROJECT_REF.supabase.co/functions/v1/monitor-web',
--       headers:='{"Content-Type": "application/json", "Authorization": "Bearer YOUR_ANON_KEY"}'::jsonb,
--       body:='{"tasks": ["ga4_today"]}'::jsonb
--   ) as request_id;
--   $$
-- );

-- 3. GA4 '7days' snapshot: Once daily (e.g., at 23:30)
-- SELECT cron.schedule(
--   'monitor-web-ga4-7days',
--   '30 23 * * *',
--   $$
--   SELECT net.http_post(
--       url:='https://YOUR_PROJECT_REF.supabase.co/functions/v1/monitor-web',
--       headers:='{"Content-Type": "application/json", "Authorization": "Bearer YOUR_ANON_KEY"}'::jsonb,
--       body:='{"tasks": ["ga4_7days"]}'::jsonb
--   ) as request_id;
--   $$
-- );
