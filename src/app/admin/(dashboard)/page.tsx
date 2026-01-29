import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, Mail, TrendingUp } from 'lucide-react';
import { prisma } from '@/lib/prisma';

async function getStats() {
  try {
    const [totalRecursos, recursosActivos, totalLeads, leadsHoy, emailsEnviados] = await Promise.all([
      prisma.recurso.count(),
      prisma.recurso.count({ where: { activo: true } }),
      prisma.lead.count(),
      prisma.lead.count({
        where: { createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
      }),
      prisma.lead.count({ where: { emailEnviado: true } }),
    ]);

    return {
      totalRecursos,
      recursosActivos,
      totalLeads,
      leadsHoy,
      emailsEnviados,
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      totalRecursos: 0,
      recursosActivos: 0,
      totalLeads: 0,
      leadsHoy: 0,
      emailsEnviados: 0,
    };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Resumen de actividad</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="rounded-[24px] border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Recursos
            </CardTitle>
            <FileText className="w-5 h-5 text-[#00A86B]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{stats.totalRecursos}</div>
            <p className="text-xs text-gray-500 mt-1">
              {stats.recursosActivos} activos
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-[24px] border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Leads
            </CardTitle>
            <Users className="w-5 h-5 text-[#00A86B]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{stats.totalLeads}</div>
            <p className="text-xs text-gray-500 mt-1">{stats.leadsHoy} hoy</p>
          </CardContent>
        </Card>

        <Card className="rounded-[24px] border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Emails
            </CardTitle>
            <Mail className="w-5 h-5 text-[#00A86B]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{stats.emailsEnviados}</div>
            <p className="text-xs text-gray-500 mt-1">enviados</p>
          </CardContent>
        </Card>

        <Card className="rounded-[24px] border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Tasa Email
            </CardTitle>
            <TrendingUp className="w-5 h-5 text-[#00A86B]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {stats.totalLeads > 0
                ? ((stats.emailsEnviados / stats.totalLeads) * 100).toFixed(1)
                : 0}
              %
            </div>
            <p className="text-xs text-gray-500 mt-1">de leads</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
