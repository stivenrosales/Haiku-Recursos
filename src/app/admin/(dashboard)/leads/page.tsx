'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Download, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchLeads = async (searchTerm?: string) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      const term = searchTerm !== undefined ? searchTerm : search;
      if (term) params.set('search', term);

      const response = await fetch(`/api/admin/leads?${params}`);
      const data = await response.json();
      setLeads(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error al cargar leads',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleExport = async () => {
    try {
      const response = await fetch('/api/admin/leads/export');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leads-${new Date().toISOString()}.csv`;
      a.click();

      toast({
        title: 'Éxito',
        description: 'CSV exportado correctamente',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error al exportar CSV',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-600 mt-2">Gestiona y contacta a tus leads</p>
        </div>
        <Button onClick={handleExport} variant="outline" className="rounded-full border-gray-300 font-semibold">
          <Download className="w-4 h-4 mr-2" />
          Exportar CSV
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar por nombre, email o WhatsApp..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchLeads(search)}
            className="pl-10 border-gray-300 focus:border-[#00A86B] focus:ring-[#00A86B] rounded-full"
          />
        </div>
        <Button onClick={() => fetchLeads(search)} className="bg-[#00A86B] text-white hover:bg-[#009160] rounded-full font-semibold px-6">
          Buscar
        </Button>
      </div>

      <div className="bg-white border border-gray-200 rounded-[24px] shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>WhatsApp</TableHead>
              <TableHead>Recurso</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <p className="text-gray-600">Cargando...</p>
                </TableCell>
              </TableRow>
            ) : leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500 py-12">
                  No hay leads registrados
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium text-gray-900">{lead.nombre}</TableCell>
                  <TableCell className="text-gray-700">{lead.email}</TableCell>
                  <TableCell className="text-gray-700">{lead.whatsapp}</TableCell>
                  <TableCell className="text-gray-700">{lead.recurso?.titulo || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        lead.emailEnviado
                          ? 'bg-[#00A86B] text-white hover:bg-[#00A86B]'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-200'
                      }
                    >
                      {lead.emailEnviado ? 'Enviado' : 'Pendiente'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
