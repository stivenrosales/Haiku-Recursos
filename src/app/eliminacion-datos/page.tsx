import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Eliminación de Datos',
  description: 'Solicita la eliminación de tus datos personales de Haiku Business y nuestra app de Facebook/Meta.',
};

export default function EliminacionDatosPage() {
  return (
    <div className="min-h-screen bg-haiku-beige">
      {/* Header */}
      <header className="bg-haiku-black text-white py-12">
        <div className="max-w-3xl mx-auto px-6">
          <Link href="/" className="font-display text-2xl font-bold hover:text-haiku-mint transition-colors">
            Haiku Business
          </Link>
          <h1 className="font-display text-3xl lg:text-4xl font-bold mt-6">
            Eliminación de Datos de Usuario
          </h1>
          <p className="text-gray-400 mt-2">Instrucciones para solicitar la eliminación de tus datos</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-12 lg:py-16">
        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 font-body text-[15px] leading-relaxed">

          <section>
            <h2 className="font-display text-xl font-bold text-haiku-black">Qué datos almacenamos</h2>
            <p>
              Cuando interactúas con nuestra aplicación a través de Facebook/Meta, podemos almacenar los siguientes datos asociados a tu cuenta:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Identificador de usuario de Facebook (ID).</li>
              <li>Nombre.</li>
              <li>Correo electrónico.</li>
            </ul>
            <p>
              Estos datos se utilizan únicamente para gestionar tu interacción con nuestros servicios y no se comparten con terceros con fines comerciales.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-haiku-black">Cómo solicitar la eliminación de tus datos</h2>
            <p>Tienes dos opciones para solicitar la eliminación completa de tus datos:</p>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-4">
              <h3 className="font-display text-lg font-bold text-haiku-black mb-3">Opción 1: Por correo electrónico</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Envía un correo a <strong>hola@haikubs.com</strong>.</li>
                <li>Usa el asunto: <strong>&quot;Solicitud de eliminación de datos&quot;</strong>.</li>
                <li>
                  En el cuerpo del correo, incluye:
                  <ul className="list-disc pl-6 mt-1 space-y-1">
                    <li>Tu nombre completo.</li>
                    <li>El correo electrónico asociado a tu cuenta de Facebook.</li>
                    <li>Tu ID de usuario de Facebook (si lo conoces).</li>
                  </ul>
                </li>
                <li>Recibirás una confirmación en un plazo máximo de <strong>5 días hábiles</strong>.</li>
              </ol>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-4">
              <h3 className="font-display text-lg font-bold text-haiku-black mb-3">Opción 2: Desde la configuración de Facebook</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Ve a tu <strong>Configuración de Facebook</strong> &rarr; <strong>Seguridad e inicio de sesión</strong>.</li>
                <li>Busca la sección <strong>&quot;Apps y sitios web&quot;</strong>.</li>
                <li>Encuentra <strong>&quot;Haiku | Automatizaciones y procesos&quot;</strong> en la lista.</li>
                <li>Haz clic en <strong>&quot;Eliminar&quot;</strong> para revocar el acceso y solicitar la eliminación de datos.</li>
                <li>Esto nos notificará automáticamente para eliminar todos los datos asociados a tu cuenta.</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-haiku-black">Qué sucede cuando solicitas la eliminación</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Todos tus datos personales almacenados en nuestros sistemas serán eliminados permanentemente.</li>
              <li>La eliminación se procesará en un plazo máximo de <strong>30 días</strong> desde la recepción de la solicitud.</li>
              <li>Recibirás una confirmación por correo electrónico una vez completado el proceso.</li>
              <li>Este proceso es <strong>irreversible</strong>: una vez eliminados, los datos no podrán recuperarse.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-haiku-black">Contacto</h2>
            <p>
              Si tienes preguntas sobre la eliminación de tus datos o nuestra política de privacidad, contáctanos:
            </p>
            <ul className="list-none space-y-1">
              <li><strong>Email:</strong> hola@haikubs.com</li>
              <li><strong>Empresa:</strong> Haiku | Automatizaciones y procesos</li>
              <li><strong>Ubicación:</strong> Lima, Perú</li>
            </ul>
            <p className="mt-4">
              Consulta también nuestra <Link href="/privacidad" className="text-haiku-mint hover:underline font-semibold">Política de Privacidad</Link> completa.
            </p>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-haiku-black text-center py-8">
        <p className="text-gray-500 text-sm">&copy; 2026 Haiku Business. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
