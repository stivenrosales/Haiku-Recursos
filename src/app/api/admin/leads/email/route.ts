import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { sendCustomEmail } from '@/lib/email';
import { emailSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const validatedData = emailSchema.parse(body);
    const { leadIds, asunto, cuerpo } = validatedData;

    // Obtener leads
    const leads = await prisma.lead.findMany({
      where: {
        id: { in: leadIds },
      },
    });

    const emails = leads.map((lead) => lead.email);

    // Enviar emails
    const result = await sendCustomEmail({
      to: emails,
      subject: asunto,
      body: cuerpo,
    });

    // Registrar email logs
    for (const lead of leads) {
      await prisma.emailLog.create({
        data: {
          leadId: lead.id,
          asunto,
          cuerpo,
          enviado: result.success,
          error: result.success ? null : JSON.stringify(result.error),
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: `Emails enviados a ${emails.length} destinatarios`,
    });
  } catch (error) {
    console.error('Error sending emails:', error);
    return NextResponse.json(
      { error: 'Error al enviar emails' },
      { status: 500 }
    );
  }
}
