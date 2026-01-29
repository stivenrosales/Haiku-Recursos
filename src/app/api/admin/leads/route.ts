import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const searchParams = req.nextUrl.searchParams;
    const recursoId = searchParams.get('recursoId');
    const emailEnviado = searchParams.get('emailEnviado');
    const search = searchParams.get('search');

    const where: any = {};

    if (recursoId) where.recursoId = recursoId;
    if (emailEnviado !== null) where.emailEnviado = emailEnviado === 'true';
    if (search) {
      where.OR = [
        { nombre: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { whatsapp: { contains: search } },
      ];
    }

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        recurso: { select: { titulo: true, slug: true } },
      },
    });

    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Error al obtener leads' },
      { status: 500 }
    );
  }
}
