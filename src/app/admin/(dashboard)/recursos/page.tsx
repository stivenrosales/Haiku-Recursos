'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash, ExternalLink, Search, Power, PowerOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function RecursosPage() {
  const [recursos, setRecursos] = useState<any[]>([]);
  const [filteredRecursos, setFilteredRecursos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const { toast } = useToast();

  useEffect(() => {
    fetchRecursos();
  }, []);

  useEffect(() => {
    filterAndSortRecursos();
  }, [recursos, search, filterStatus, sortBy]);

  const fetchRecursos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/recursos');
      const data = await response.json();
      setRecursos(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error al cargar recursos',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortRecursos = () => {
    let filtered = [...recursos];

    // Filtrar por búsqueda
    if (search) {
      filtered = filtered.filter(
        (r) =>
          r.titulo.toLowerCase().includes(search.toLowerCase()) ||
          r.slug.toLowerCase().includes(search.toLowerCase()) ||
          r.descripcion.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtrar por estado
    if (filterStatus === 'active') {
      filtered = filtered.filter((r) => r.activo);
    } else if (filterStatus === 'inactive') {
      filtered = filtered.filter((r) => !r.activo);
    }

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'name':
          return a.titulo.localeCompare(b.titulo);
        case 'leads':
          return (b._count?.leads || 0) - (a._count?.leads || 0);
        default:
          return 0;
      }
    });

    setFilteredRecursos(filtered);
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/recursos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activo: !currentStatus }),
      });

      if (response.ok) {
        toast({
          title: 'Éxito',
          description: `Recurso ${!currentStatus ? 'activado' : 'desactivado'}`,
        });
        fetchRecursos();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error al actualizar recurso',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este recurso?')) return;

    try {
      const response = await fetch(`/api/admin/recursos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: 'Éxito',
          description: 'Recurso eliminado',
        });
        fetchRecursos();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error al eliminar recurso',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Recursos</h1>
          <p className="text-gray-600 mt-2">
            Gestiona los recursos disponibles para leads
          </p>
        </div>
        <Link href="/admin/recursos/nuevo">
          <Button className="bg-[#00A86B] text-white hover:bg-[#009160] font-semibold rounded-full px-6">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Recurso
          </Button>
        </Link>
      </div>

      {/* Filtros y búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar por título, slug o descripción..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 border-gray-300 focus:border-[#00A86B] focus:ring-[#00A86B] rounded-full"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[180px] rounded-full border-gray-300">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Activos</SelectItem>
            <SelectItem value="inactive">Inactivos</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[180px] rounded-full border-gray-300">
            <SelectValue placeholder="Ordenar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Más recientes</SelectItem>
            <SelectItem value="oldest">Más antiguos</SelectItem>
            <SelectItem value="name">Por nombre</SelectItem>
            <SelectItem value="leads">Por leads</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Cargando...</p>
        </div>
      ) : filteredRecursos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No se encontraron recursos</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecursos.map((recurso) => (
            <Card key={recurso.id} className="p-6 rounded-[24px] border-gray-200 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-lg text-gray-900 flex-1">{recurso.titulo}</h3>
                  <Badge
                    className={
                      recurso.activo
                        ? 'bg-[#00A86B] text-white hover:bg-[#00A86B]'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-200'
                    }
                  >
                    {recurso.activo ? 'Activo' : 'Inactivo'}
                  </Badge>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {recurso.descripcion}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{recurso._count?.leads || 0} leads</span>
                  <button
                    onClick={() => toggleActive(recurso.id, recurso.activo)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition ${
                      recurso.activo
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-[#00A86B]/10 text-[#00A86B] hover:bg-[#00A86B]/20'
                    }`}
                    title={recurso.activo ? 'Desactivar' : 'Activar'}
                  >
                    {recurso.activo ? (
                      <>
                        <PowerOff className="w-3 h-3" />
                        Desactivar
                      </>
                    ) : (
                      <>
                        <Power className="w-3 h-3" />
                        Activar
                      </>
                    )}
                  </button>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/r/${recurso.slug}`}
                    target="_blank"
                    className="flex-1"
                  >
                    <Button variant="outline" size="sm" className="w-full rounded-full border-gray-300">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Ver Landing
                    </Button>
                  </Link>
                  <Link href={`/admin/recursos/${recurso.id}/editar`}>
                    <Button variant="outline" size="sm" className="rounded-full border-gray-300">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(recurso.id)}
                    className="rounded-full"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
