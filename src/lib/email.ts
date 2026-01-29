import { Resend } from 'resend';
import { RecursoEmail } from '@/emails/RecursoEmail';
import { CustomEmail } from '@/emails/CustomEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendRecursoEmail({
  to,
  nombre,
  titulo,
  urlRecurso,
  asunto,
  cuerpo,
}: {
  to: string;
  nombre: string;
  titulo: string;
  urlRecurso: string;
  asunto: string;
  cuerpo: string;
}) {
  try {
    // Reemplazar variables en el template
    const cuerpoPersonalizado = cuerpo
      .replace(/{{nombre}}/g, nombre)
      .replace(/{{urlRecurso}}/g, urlRecurso)
      .replace(/{{titulo}}/g, titulo);

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to,
      subject: asunto,
      react: RecursoEmail({
        nombre,
        titulo,
        urlRecurso,
        cuerpo: cuerpoPersonalizado,
      }),
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}

export async function sendCustomEmail({
  to,
  subject,
  body,
}: {
  to: string | string[];
  subject: string;
  body: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: Array.isArray(to) ? to : [to],
      subject,
      react: CustomEmail({ body }),
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending custom email:', error);
    return { success: false, error };
  }
}
