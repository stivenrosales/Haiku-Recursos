import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Haiku — Automatización e IA para Negocios',
    template: '%s | Haiku Business',
  },
  description: 'Recursos gratuitos, automatización e IA para tu negocio. Descarga guías y herramientas gratis.',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "ve9ieebihf");
            `,
          }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${inter.variable} font-body`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
