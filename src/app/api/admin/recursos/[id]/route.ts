import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { recursoSchema } from '@/lib/validations';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await req.json();
    const validatedData = recursoSchema.parse(body);

    const recurso = await prisma.recurso.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(recurso);
  } catch (error) {
    console.error('Error updating recurso:', error);
    return NextResponse.json(
      { error: 'Error al actualizar recurso' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await req.json();

    // Solo permitir actualizar el campo activo en PATCH
    const recurso = await prisma.recurso.update({
      where: { id },
      data: { activo: body.activo },
    });

    return NextResponse.json(recurso);
  } catch (error) {
    console.error('Error updating recurso status:', error);
    return NextResponse.json(
      { error: 'Error al actualizar estado del recurso' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    await prisma.recurso.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting recurso:', error);
    return NextResponse.json(
      { error: 'Error al eliminar recurso' },
      { status: 500 }
    );
  }
}
