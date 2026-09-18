import { ImageResponse } from 'next/og'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'edge'
export const alt = 'Case Study Preview'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: project } = await supabase
    .from('case_studies')
    .select('title, category')
    .eq('slug', resolvedParams.slug)
    .single();

  const title = project?.title || 'Case Study';
  const category = project?.category || 'Work';

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
          backgroundImage: 'radial-gradient(circle at 25px 25px, #1e293b 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1e293b 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 80px',
            background: 'rgba(15, 23, 42, 0.8)',
            border: '2px solid rgba(56, 189, 248, 0.2)',
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 32,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: '#38bdf8', // Tailwind light blue primary
              marginBottom: 20,
              fontWeight: 700,
            }}
          >
            {category}
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.1,
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
              <span style={{ color: 'white', fontWeight: 600 }}>NexCy</span> Technologies
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
