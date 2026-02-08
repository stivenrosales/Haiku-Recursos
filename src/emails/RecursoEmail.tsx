import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface RecursoEmailProps {
  nombre: string;
  titulo: string;
  urlRecurso: string;
  cuerpo: string;
}

export const RecursoEmail = ({
  nombre,
  titulo,
  urlRecurso,
  cuerpo,
}: RecursoEmailProps) => (
  <Html>
    <Head />
    <Preview>{titulo} - Tu recurso está listo</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header simple */}
        <Section style={header}>
          <Heading style={logoText}>Haiku Business</Heading>
        </Section>

        {/* Contenido principal */}
        <Section style={content}>
          <Heading style={greeting}>¡Hola {nombre}!</Heading>

          <Text style={paragraph}>
            Gracias por tu interés en <strong>{titulo}</strong>. Tu recurso ya está listo para descargar.
          </Text>

          {/* Cuerpo personalizado */}
          <Text style={bodyText}>{cuerpo}</Text>

          {/* Botón CTA */}
          <Section style={buttonContainer}>
            <Button style={button} href={urlRecurso}>
              Obtener Recurso Gratis →
            </Button>
          </Section>
        </Section>

        {/* Separador */}
        <Hr style={divider} />

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>
            Automatización e IA para negocios
          </Text>

          {/* Redes sociales - versión compatible con email */}
          <table style={socialTable}>
            <tbody>
              <tr>
                <td style={socialCellSimple}>
                  <Link href="https://www.youtube.com/@stivenrosalesc" style={socialLinkSimple}>
                    YouTube
                  </Link>
                </td>
                <td style={socialDividerCell}>
                  <span style={socialDividerSpan}>•</span>
                </td>
                <td style={socialCellSimple}>
                  <Link href="https://www.instagram.com/stiven.rosalesc/" style={socialLinkSimple}>
                    Instagram
                  </Link>
                </td>
                <td style={socialDividerCell}>
                  <span style={socialDividerSpan}>•</span>
                </td>
                <td style={socialCellSimple}>
                  <Link href="https://www.linkedin.com/in/stiven-kevin-rosales-casas/" style={socialLinkSimple}>
                    LinkedIn
                  </Link>
                </td>
                <td style={socialDividerCell}>
                  <span style={socialDividerSpan}>•</span>
                </td>
                <td style={socialCellSimple}>
                  <Link href="https://www.tiktok.com/@sk.rosales" style={socialLinkSimple}>
                    TikTok
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>

          <Text style={copyright}>
            © 2026 Haiku Business
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

// Estilos optimizados
const main = {
  backgroundColor: '#FAF9F6',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  padding: '40px 20px',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '0',
  maxWidth: '600px',
  borderRadius: '24px',
  overflow: 'hidden',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
};

const header = {
  padding: '40px 40px 0',
  textAlign: 'left' as const,
};

const logoText = {
  color: '#171717',
  fontSize: '28px',
  fontWeight: '700',
  margin: '0',
  lineHeight: '1.2',
};

const content = {
  padding: '32px 40px 40px',
};

const greeting = {
  color: '#171717',
  fontSize: '36px',
  fontWeight: '700',
  margin: '0 0 24px 0',
  lineHeight: '1.2',
};

const paragraph = {
  color: '#4b5563',
  fontSize: '18px',
  lineHeight: '1.6',
  margin: '0 0 24px 0',
};

const bodyText = {
  color: '#6b7280',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 32px 0',
  whiteSpace: 'pre-wrap' as const,
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '0 0 32px 0',
};

const button = {
  backgroundColor: '#00A86B',
  borderRadius: '50px',
  color: '#ffffff',
  fontSize: '18px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '16px 48px',
  lineHeight: '1.5',
};

const linkText = {
  color: '#9ca3af',
  fontSize: '13px',
  textAlign: 'center' as const,
  margin: '0 0 8px 0',
};

const link = {
  color: '#00A86B',
  fontSize: '13px',
  textDecoration: 'underline',
  wordBreak: 'break-all' as const,
  display: 'block',
  textAlign: 'center' as const,
};

const divider = {
  borderColor: '#e5e7eb',
  margin: '0',
};

const footer = {
  padding: '32px 40px',
  textAlign: 'center' as const,
  backgroundColor: '#FAF9F6',
};

const footerText = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '0 0 24px 0',
  lineHeight: '1.5',
};

const socialTable = {
  margin: '0 auto 20px',
  borderSpacing: '0',
  borderCollapse: 'collapse' as const,
};

const socialCellSimple = {
  padding: '0',
};

const socialDividerCell = {
  padding: '0 8px',
};

const socialLinkSimple = {
  color: '#00A86B',
  fontSize: '14px',
  textDecoration: 'none',
  fontWeight: '500',
};

const socialDividerSpan = {
  color: '#d1d5db',
  fontSize: '14px',
};

const copyright = {
  color: '#9ca3af',
  fontSize: '12px',
  margin: '0',
};

export default RecursoEmail;
