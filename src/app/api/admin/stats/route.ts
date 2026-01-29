import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const [
      totalRecursos,
      recursosActivos,
      totalLeads,
      leadsHoy,
      emailsEnviados,
    ] = await Promise.all([
      prisma.recurso.count(),
      prisma.recurso.count({ where: { activo: true } }),
      prisma.lead.count(),
      prisma.lead.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),
      prisma.lead.count({ where: { emailEnviado: true } }),
    ]);

    return NextResponse.json({
      totalRecursos,
      recursosActivos,
      totalLeads,
      leadsHoy,
      emailsEnviados,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Error al obtener estadísticas' },
      { status: 500 }
    );
  }
}
