'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Search, Mail, Phone, Clock, Check, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ContactosPage() {
  const [contactos, setContactos] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filterLeido, setFilterLeido] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchContactos = async (searchTerm?: string) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      const term = searchTerm !== undefined ? searchTerm : search;
      if (term) params.set('search', term);
      if (filterLeido !== 'all') params.set('leido', filterLeido);

      const response = await fetch(`/api/admin/contactos?${params}`);
      const data = await response.json();
      setContactos(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error al cargar contactos',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactos();
  }, [filterLeido]);

  const toggleLeido = async (id: string, currentLeido: boolean) => {
    try {
      const response = await fetch('/api/admin/contactos', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, leido: !currentLeido }),
      });

      if (response.ok) {
        toast({
          title: 'Actualizado',
          description: `Mensaje marcado como ${!currentLeido ? 'leído' : 'no leído'}`,
        });
        fetchContactos();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error al actualizar',
        variant: 'destructive',
      });
    }
  };

  const noLeidos = contactos.filter((c) => !c.leido).length;

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold text-gray-900">Contactos</h1>
          {noLeidos > 0 && (
            <span className="flex items-center justify-center w-7 h-7 bg-[#00A86B] text-white text-xs font-bold rounded-full">
              {noLeidos}
            </span>
          )}
        </div>
        <p className="text-gray-600 mt-2">Mensajes recibidos desde el formulario de contacto</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar por nombre, email o mensaje..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchContactos(search)}
            className="pl-10 border-gray-300 focus:border-[#00A86B] focus:ring-[#00A86B] rounded-full"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'false', 'true'].map((val) => {
            const labels: Record<string, string> = { all: 'Todos', false: 'No leídos', true: 'Leídos' };
            return (
              <button
                key={val}
                onClick={() => setFilterLeido(val)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium border transition-all ${
                  filterLeido === val
                    ? 'bg-[#00A86B]/10 text-[#00A86B] border-[#00A86B]/30'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                }`}
              >
                {labels[val]}
              </button>
            );
          })}
        </div>
      </div>

      {!loading && (
        <p className="text-sm text-gray-500">{contactos.length} mensajes</p>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Cargando...</p>
        </div>
      ) : contactos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No hay mensajes de contacto</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contactos.map((contacto) => (
            <Card
              key={contacto.id}
              className={`p-6 rounded-[24px] border shadow-sm transition-all ${
                contacto.leido
                  ? 'border-gray-200 bg-white'
                  : 'border-[#00A86B]/30 bg-[#00A86B]/5'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-lg text-gray-900">{contacto.nombre}</h3>
                    {!contacto.leido && (
                      <Badge className="bg-[#00A86B] text-white hover:bg-[#00A86B] text-xs">
                        Nuevo
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" />
                      {contacto.email}
                    </span>
                    {contacto.whatsapp && (
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" />
                        {contacto.whatsapp}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(contacto.createdAt).toLocaleDateString('es-PE', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {contacto.mensaje}
                  </p>
                </div>

                <button
                  onClick={() => toggleLeido(contacto.id, contacto.leido)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 ${
                    contacto.leido
                      ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      : 'bg-[#00A86B]/10 text-[#00A86B] hover:bg-[#00A86B]/20'
                  }`}
                  title={contacto.leido ? 'Marcar como no leído' : 'Marcar como leído'}
                >
                  {contacto.leido ? (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      Leído
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Marcar leído
                    </>
                  )}
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
