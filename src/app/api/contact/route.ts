import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email, whatsapp, mensaje } = body;

    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: 'Nombre, email y mensaje son requeridos' },
        { status: 400 }
      );
    }

    // Guardar en DB
    const contacto = await prisma.contacto.create({
      data: {
        nombre,
        email,
        whatsapp: whatsapp || null,
        mensaje,
      },
    });

    // Enviar email de notificación al admin
    try {
      const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.RESEND_FROM_EMAIL;
      if (adminEmail) {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL!,
          to: adminEmail,
          subject: `Nuevo mensaje de contacto — ${nombre}`,
          html: `
            <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
              <div style="background: linear-gradient(135deg, #00A86B 0%, #009160 100%); border-radius: 16px; padding: 24px; margin-bottom: 24px;">
                <h1 style="color: white; margin: 0; font-size: 20px;">Nuevo Mensaje de Contacto</h1>
              </div>
              <div style="background: #f9fafb; border-radius: 12px; padding: 24px; margin-bottom: 16px;">
                <p style="margin: 0 0 8px; color: #6b7280; font-size: 13px;">NOMBRE</p>
                <p style="margin: 0 0 20px; color: #111827; font-size: 16px; font-weight: 600;">${nombre}</p>
                <p style="margin: 0 0 8px; color: #6b7280; font-size: 13px;">EMAIL</p>
                <p style="margin: 0 0 20px; color: #111827; font-size: 16px;">${email}</p>
                ${whatsapp ? `
                  <p style="margin: 0 0 8px; color: #6b7280; font-size: 13px;">WHATSAPP</p>
                  <p style="margin: 0 0 20px; color: #111827; font-size: 16px;">${whatsapp}</p>
                ` : ''}
                <p style="margin: 0 0 8px; color: #6b7280; font-size: 13px;">MENSAJE</p>
                <p style="margin: 0; color: #111827; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${mensaje}</p>
              </div>
              <p style="color: #9ca3af; font-size: 12px; text-align: center;">Haiku Business — Panel de Admin</p>
            </div>
          `,
        });
      }
    } catch (emailError) {
      console.error('Error sending notification email:', emailError);
      // No fallar si el email de notificación falla
    }

    return NextResponse.json(
      { message: 'Mensaje enviado correctamente', id: contacto.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact:', error);
    return NextResponse.json(
      { error: 'Error al procesar el mensaje' },
      { status: 500 }
    );
  }
}
