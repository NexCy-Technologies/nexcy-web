import { ImageResponse } from 'next/og'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-static'
export const alt = 'Service Detail'

export async function generateStaticParams() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data: services } = await supabase.from("services").select("id");
  return (services || []).map((service) => ({
    id: service.id,
  }));
}
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: service } = await supabase
    .from('services')
    .select('title')
    .eq('id', resolvedParams.id)
    .single();

  const title = service?.title || 'Service';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#020617', // Next.js deep slate background
          backgroundImage: 'linear-gradient(to right bottom, #0f172a, #020617)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 80px',
            background: 'rgba(15, 23, 42, 0.6)',
            border: '2px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 24,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#38bdf8', // Tailwind light blue primary
              marginBottom: 20,
              fontWeight: 600,
            }}
          >
            NexCy Service
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.2,
              marginBottom: 40,
              maxWidth: 800,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                fontSize: 28,
                color: '#94a3b8', // slate-400
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <span style={{ color: 'white', fontWeight: 600 }}>nexcy</span>.lk
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
