export function ProximosPasos({ vigenciaHasta }: { vigenciaHasta: Date }) {
  const formatDate = (d: Date) =>
    d.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <section className="max-w-4xl mx-auto px-8 py-12 print:py-8">
      <h2 className="font-display text-2xl font-bold text-haiku-black mb-8">
        Próximos pasos
      </h2>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-haiku-mint/10 flex items-center justify-center flex-shrink-0">
            <span className="font-display text-sm font-bold text-haiku-mint">1</span>
          </div>
          <div>
            <h3 className="font-display font-semibold text-haiku-black">Elige el servicio</h3>
            <p className="font-body text-sm text-gray-600 mt-1">
              Revisa los servicios propuestos y decide cuál se ajusta a las necesidades del negocio.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-haiku-mint/10 flex items-center justify-center flex-shrink-0">
            <span className="font-display text-sm font-bold text-haiku-mint">2</span>
          </div>
          <div>
            <h3 className="font-display font-semibold text-haiku-black">Agendamos una reunión</h3>
            <p className="font-body text-sm text-gray-600 mt-1">
              Coordinamos una llamada para resolver dudas y definir los siguientes pasos.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-haiku-mint/10 flex items-center justify-center flex-shrink-0">
            <span className="font-display text-sm font-bold text-haiku-mint">3</span>
          </div>
          <div>
            <h3 className="font-display font-semibold text-haiku-black">Comenzamos</h3>
            <p className="font-body text-sm text-gray-600 mt-1">
              Una vez confirmado, comenzamos con la primera reunión de planificación.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-100 print:bg-white">
        <p className="font-body text-sm text-gray-500">
          Esta propuesta es válida hasta el{' '}
          <span className="font-semibold text-haiku-black">{formatDate(vigenciaHasta)}</span>.
          Después de esa fecha, los precios y condiciones pueden cambiar.
        </p>
      </div>
      <div className="mt-8 text-center print:mt-12">
        <p className="font-body text-gray-500 mb-4">¿Listo para empezar?</p>
        <a
          href="https://wa.me/51994122404"
          className="inline-block bg-haiku-mint text-white font-display font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity print:border print:border-haiku-mint print:bg-white print:text-haiku-mint"
        >
          Contactar por WhatsApp
        </a>
      </div>
    </section>
  );
}
