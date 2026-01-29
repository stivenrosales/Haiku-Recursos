import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { recursoSchema } from '@/lib/validations';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const recursos = await prisma.recurso.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { leads: true } },
      },
    });

    return NextResponse.json(recursos);
  } catch (error) {
    console.error('Error fetching recursos:', error);
    return NextResponse.json(
      { error: 'Error al obtener recursos' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validatedData = recursoSchema.parse(body);

    // Verificar slug único
    const existing = await prisma.recurso.findUnique({
      where: { slug: validatedData.slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'El slug ya existe' },
        { status: 400 }
      );
    }

    const recurso = await prisma.recurso.create({
      data: validatedData,
    });

    return NextResponse.json(recurso, { status: 201 });
  } catch (error: any) {
    console.error('Error creating recurso:', error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Error al crear recurso' },
      { status: 500 }
    );
  }
}
