import { Check } from 'lucide-react';

interface Servicio {
  titulo: string;
  precio: string;
  tipoPago: string;
  descripcion: string;
  items: string[];
}

export function ServicioCard({ servicio, index }: { servicio: Servicio; index: number }) {
  return (
    <div className="border border-gray-100 rounded-[24px] p-8 print:p-6 print:rounded-xl">
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="inline-block text-xs font-body text-haiku-mint font-semibold uppercase tracking-wider mb-2">
            Servicio {index}
          </span>
          <h3 className="font-display text-xl font-bold text-haiku-black">
            {servicio.titulo}
          </h3>
        </div>
        <div className="text-right flex-shrink-0 ml-4">
          <p className="font-display text-2xl font-bold text-haiku-mint">{servicio.precio}</p>
          <p className="font-body text-xs text-gray-400">{servicio.tipoPago}</p>
        </div>
      </div>
      <p className="font-body text-gray-600 mb-6">{servicio.descripcion}</p>
      <div className="space-y-3">
        <p className="font-display text-sm font-semibold text-haiku-black">Incluye:</p>
        {servicio.items.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <Check className="w-4 h-4 text-haiku-mint flex-shrink-0 mt-0.5" />
            <span className="font-body text-sm text-gray-600">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
