import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Text,
} from '@react-email/components';

interface CustomEmailProps {
  body: string;
}

export const CustomEmail = ({ body }: CustomEmailProps) => (
  <Html>
    <Head />
    <Preview>Mensaje de Haiku Business</Preview>
    <Body style={main}>
      <Container style={container}>
        <div dangerouslySetInnerHTML={{ __html: body }} />
        <Text style={footer}>
          Haiku Business - Automatización Empresarial
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 48px 48px',
  maxWidth: '600px',
};

const footer = {
  color: '#9ca3af',
  fontSize: '12px',
  marginTop: '32px',
};
