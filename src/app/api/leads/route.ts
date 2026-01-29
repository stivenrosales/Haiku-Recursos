import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendRecursoEmail } from '@/lib/email';
import { leadSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validar datos
    const validatedData = leadSchema.parse(body);
    const { nombre, email, whatsapp, slug } = validatedData;

    // Buscar recurso activo
    const recurso = await prisma.recurso.findUnique({
      where: { slug, activo: true },
    });

    if (!recurso) {
      return NextResponse.json(
        { error: 'Recurso no encontrado o inactivo' },
        { status: 404 }
      );
    }

    // Crear lead
    const lead = await prisma.lead.create({
      data: {
        nombre,
        email,
        whatsapp,
        recursoId: recurso.id,
        emailEnviado: false,
      },
    });

    // Enviar email con recurso
    const emailResult = await sendRecursoEmail({
      to: email,
      nombre,
      titulo: recurso.titulo,
      urlRecurso: recurso.urlRecurso,
      asunto: recurso.emailAsunto,
      cuerpo: recurso.emailCuerpo,
    });

    // Registrar email log
    await prisma.emailLog.create({
      data: {
        leadId: lead.id,
        asunto: recurso.emailAsunto,
        cuerpo: recurso.emailCuerpo,
        enviado: emailResult.success,
        error: emailResult.success ? null : JSON.stringify(emailResult.error),
      },
    });

    // Actualizar estado
    if (emailResult.success) {
      await prisma.lead.update({
        where: { id: lead.id },
        data: { emailEnviado: true },
      });
    }

    return NextResponse.json({
      success: true,
      message: emailResult.success
        ? '¡Listo! Revisa tu email para acceder al recurso'
        : 'Registro exitoso. Hubo un problema al enviar el email, contacta a soporte.',
      recursoUrl: recurso.urlRecurso,
    });
  } catch (error: any) {
    console.error('Error creating lead:', error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Error al procesar solicitud' },
      { status: 500 }
    );
  }
}
