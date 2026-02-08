'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { IconPicker } from '@/components/admin/IconPicker';

export default function NuevoRecursoPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    slug: '',
    descripcion: '',
    urlRecurso: '',
    icono: '',
    emailAsunto: '',
    emailCuerpo: '',
    activo: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/recursos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: 'Éxito',
          description: 'Recurso creado correctamente',
        });
        router.push('/admin/recursos');
      } else {
        const data = await response.json();
        toast({
          title: 'Error',
          description: data.error || 'Error al crear recurso',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error al crear recurso',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <Link href="/admin/recursos">
          <Button variant="ghost" size="sm" className="rounded-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Nuevo Recurso</h1>
        <p className="text-gray-600 mt-2">Crea un nuevo recurso y landing page</p>
      </div>

      <Card className="p-8 rounded-[24px] border-gray-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="titulo" className="text-sm font-medium text-gray-700">Título *</Label>
            <Input
              id="titulo"
              value={formData.titulo}
              onChange={(e) =>
                setFormData({ ...formData, titulo: e.target.value })
              }
              required
              className="mt-1 border-gray-300 focus:border-[#00A86B] focus:ring-[#00A86B]"
            />
          </div>

          <div>
            <Label htmlFor="slug" className="text-sm font-medium text-gray-700">Slug (URL) *</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              placeholder="kit-automatizacion"
              required
              className="mt-1 border-gray-300 focus:border-[#00A86B] focus:ring-[#00A86B]"
            />
            <p className="text-sm text-gray-500 mt-1">
              URL: {process.env.NEXT_PUBLIC_APP_URL}/r/{formData.slug || '...'}
            </p>
          </div>

          <div>
            <Label htmlFor="descripcion" className="text-sm font-medium text-gray-700">Descripción *</Label>
            <Textarea
              id="descripcion"
              value={formData.descripcion}
              onChange={(e) =>
                setFormData({ ...formData, descripcion: e.target.value })
              }
              rows={3}
              required
              className="mt-1 border-gray-300 focus:border-[#00A86B] focus:ring-[#00A86B]"
            />
          </div>

          <div>
            <Label htmlFor="urlRecurso" className="text-sm font-medium text-gray-700">URL del Recurso *</Label>
            <Input
              id="urlRecurso"
              type="url"
              value={formData.urlRecurso}
              onChange={(e) =>
                setFormData({ ...formData, urlRecurso: e.target.value })
              }
              placeholder="https://drive.google.com/..."
              required
              className="mt-1 border-gray-300 focus:border-[#00A86B] focus:ring-[#00A86B]"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">Ícono del recurso</Label>
            <p className="text-sm text-gray-500 mt-1 mb-3">Selecciona un ícono para la card del recurso</p>
            <IconPicker
              value={formData.icono}
              onChange={(icon) => setFormData({ ...formData, icono: icon })}
            />
          </div>

          <div>
            <Label htmlFor="emailAsunto" className="text-sm font-medium text-gray-700">Asunto del Email *</Label>
            <Input
              id="emailAsunto"
              value={formData.emailAsunto}
              onChange={(e) =>
                setFormData({ ...formData, emailAsunto: e.target.value })
              }
              placeholder="Tu recurso está listo 🎁"
              required
              className="mt-1 border-gray-300 focus:border-[#00A86B] focus:ring-[#00A86B]"
            />
          </div>

          <div>
            <Label htmlFor="emailCuerpo" className="text-sm font-medium text-gray-700">Cuerpo del Email *</Label>
            <Textarea
              id="emailCuerpo"
              value={formData.emailCuerpo}
              onChange={(e) =>
                setFormData({ ...formData, emailCuerpo: e.target.value })
              }
              rows={6}
              placeholder="Hola {{nombre}},&#10;&#10;Aquí está tu recurso: {{urlRecurso}}&#10;&#10;¡Éxito!&#10;Stiven - Haiku Business"
              required
              className="mt-1 border-gray-300 focus:border-[#00A86B] focus:ring-[#00A86B]"
            />
            <p className="text-sm text-gray-500 mt-1">
              Variables: {'{'}nombre{'}'}, {'{'}urlRecurso{'}'}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="activo"
              checked={formData.activo}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, activo: checked })
              }
            />
            <Label htmlFor="activo" className="text-sm font-medium text-gray-700">Recurso activo</Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#00A86B] text-white hover:bg-[#009160] font-semibold py-6 text-lg rounded-full"
            disabled={loading}
          >
            {loading ? 'Creando...' : 'Crear Recurso'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
