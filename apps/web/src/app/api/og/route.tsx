import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') ?? 'Jurerê Mais'
  const subtitle = searchParams.get('subtitle') ?? 'Gestão urbana colaborativa'
  const type = searchParams.get('type') ?? 'default'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0A2540 0%, #0d3361 50%, #0a2540 100%)',
          padding: '60px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Accent circle */}
        <div
          style={{
            position: 'absolute',
            right: '-100px',
            top: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(0,179,126,0.15)',
            filter: 'blur(60px)',
          }}
        />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <span style={{ color: 'white', fontSize: '20px', fontWeight: 700 }}>Jurerê</span>
          <span
            style={{
              background: '#00B37E',
              color: 'white',
              padding: '2px 10px',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 700,
            }}
          >
            Mais
          </span>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Content */}
        <div>
          {type !== 'default' && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#00B37E',
                }}
              />
              <span
                style={{
                  color: '#00B37E',
                  fontSize: '14px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                }}
              >
                {type}
              </span>
            </div>
          )}

          <div
            style={{
              color: 'white',
              fontSize: title.length > 50 ? '44px' : '56px',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: '16px',
              maxWidth: '900px',
            }}
          >
            {title}
          </div>

          {subtitle && (
            <div
              style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '22px',
                maxWidth: '700px',
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #00B37E, #0A2540)',
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
