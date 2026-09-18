import { ImageResponse } from 'next/og';
import { supabase } from '@/lib/supabase';

export const runtime = 'edge';
export const alt = 'Project OG Image';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: project } = await supabase
    .from('case_studies')
    .select('*')
    .eq('slug', slug)
    .single();

  const title = project?.title || 'Project';
  const category = project?.category || 'WORK';

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'monospace',
          borderTop: '8px solid #00F0FF',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              color: '#00F0FF',
              fontSize: '32px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '24px',
            }}
          >
            // {category}
          </div>
          <div
            style={{
              color: '#FFFFFF',
              fontSize: '84px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '-0.05em',
              lineHeight: 1.1,
              maxWidth: '900px',
            }}
          >
            {title}
          </div>
        </div>
        
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '2px solid #333333',
            paddingTop: '32px',
            color: '#888888',
            fontSize: '24px',
            textTransform: 'uppercase',
          }}
        >
          <div>NEXCY TECHNOLOGIES</div>
          <div style={{ color: '#00F0FF' }}>SYSTEM v2.0</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
