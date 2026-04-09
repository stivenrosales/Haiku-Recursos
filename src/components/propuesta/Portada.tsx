interface PortadaProps {
  clienteNombre: string;
  fecha: Date;
  vigenciaHasta: Date;
}

export function Portada({ clienteNombre, fecha, vigenciaHasta }: PortadaProps) {
  const formatDate = (d: Date) =>
    d.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-65px)] print:min-h-0 print:py-32 px-8 bg-haiku-beige relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-haiku-mint/10 rounded-full blur-[120px] print:hidden" />
      <div className="relative text-center">
        <p className="font-body text-sm text-gray-500 uppercase tracking-widest mb-4">
          Propuesta comercial
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-haiku-black mb-6 leading-tight">
          {clienteNombre}
        </h1>
        <div className="w-16 h-1 bg-haiku-mint mx-auto mb-8 rounded-full" />
        <p className="font-body text-gray-500">{formatDate(fecha)}</p>
        <p className="font-body text-xs text-gray-400 mt-2">
          Válida hasta el {formatDate(vigenciaHasta)}
        </p>
      </div>
    </section>
  );
}
