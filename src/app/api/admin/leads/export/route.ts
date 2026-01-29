import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { generateCSV } from '@/lib/csv';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      include: { recurso: { select: { titulo: true } } },
    });

    const csvData = leads.map((lead) => ({
      nombre: lead.nombre,
      email: lead.email,
      whatsapp: lead.whatsapp,
      recurso: lead.recurso?.titulo || 'N/A',
      emailEnviado: lead.emailEnviado ? 'Sí' : 'No',
      createdAt: new Date(lead.createdAt).toLocaleString(),
    }));

    const headers = [
      'nombre',
      'email',
      'whatsapp',
      'recurso',
      'emailEnviado',
      'createdAt',
    ];
    const csv = generateCSV(csvData, headers);

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="leads-${new Date().toISOString()}.csv"`,
      },
    });
  } catch (error) {
    console.error('Error exporting leads:', error);
    return NextResponse.json(
      { error: 'Error al exportar' },
      { status: 500 }
    );
  }
}
