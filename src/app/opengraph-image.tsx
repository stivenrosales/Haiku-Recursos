import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Haiku — Automatización e IA para Negocios';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #00A86B 0%, #008F5B 50%, #007A4D 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Logo circle */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 30,
            background: 'rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://www.haikubs.com/favicon.png"
            width={80}
            height={80}
            alt="Haiku"
          />
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: 'white',
            letterSpacing: -2,
            marginBottom: 16,
          }}
        >
          Haiku Business
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: 'rgba(255,255,255,0.85)',
            maxWidth: 700,
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          Agentes de WhatsApp con IA que venden por ti
        </div>
      </div>
    ),
    { ...size }
  );
}
