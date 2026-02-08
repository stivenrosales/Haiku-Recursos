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
    const search = searchParams.get('search');
    const leido = searchParams.get('leido');

    const where: any = {};

    if (leido === 'true') where.leido = true;
    if (leido === 'false') where.leido = false;
    if (search) {
      where.OR = [
        { nombre: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { mensaje: { contains: search, mode: 'insensitive' } },
      ];
    }

    const contactos = await prisma.contacto.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(contactos);
  } catch (error) {
    console.error('Error fetching contactos:', error);
    return NextResponse.json(
      { error: 'Error al obtener contactos' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { id, leido } = body;

    const contacto = await prisma.contacto.update({
      where: { id },
      data: { leido },
    });

    return NextResponse.json(contacto);
  } catch (error) {
    console.error('Error updating contacto:', error);
    return NextResponse.json(
      { error: 'Error al actualizar contacto' },
      { status: 500 }
    );
  }
}
