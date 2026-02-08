import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, Mail, MessageSquare } from 'lucide-react';
import { prisma } from '@/lib/prisma';

async function getStats() {
  try {
    const [totalRecursos, recursosActivos, totalLeads, leadsHoy, emailsEnviados, uniqueEmails, totalContactos, contactosNoLeidos] = await Promise.all([
      prisma.recurso.count(),
      prisma.recurso.count({ where: { activo: true } }),
      prisma.lead.count(),
      prisma.lead.count({
        where: { createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
      }),
      prisma.lead.count({ where: { emailEnviado: true } }),
      prisma.lead.groupBy({ by: ['email'] }).then((groups) => groups.length),
      prisma.contacto.count(),
      prisma.contacto.count({ where: { leido: false } }),
    ]);

    return {
      totalRecursos,
      recursosActivos,
      totalLeads,
      uniqueLeads: uniqueEmails,
      leadsHoy,
      emailsEnviados,
      totalContactos,
      contactosNoLeidos,
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      totalRecursos: 0,
      recursosActivos: 0,
      totalLeads: 0,
      uniqueLeads: 0,
      leadsHoy: 0,
      emailsEnviados: 0,
      totalContactos: 0,
      contactosNoLeidos: 0,
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
            <div className="text-3xl font-bold text-gray-900">{stats.uniqueLeads}</div>
            <p className="text-xs text-gray-500 mt-1">{stats.totalLeads} total &middot; {stats.leadsHoy} hoy</p>
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
              Contactos
            </CardTitle>
            <MessageSquare className="w-5 h-5 text-[#00A86B]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{stats.totalContactos}</div>
            <p className="text-xs text-gray-500 mt-1">
              {stats.contactosNoLeidos > 0
                ? `${stats.contactosNoLeidos} sin leer`
                : 'todos leídos'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
