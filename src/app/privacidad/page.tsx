import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de Haiku Business. Conoce cómo recopilamos, usamos y protegemos tus datos.',
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-haiku-beige">
      {/* Header */}
      <header className="bg-haiku-black text-white py-12">
        <div className="max-w-3xl mx-auto px-6">
          <Link href="/" className="font-display text-2xl font-bold hover:text-haiku-mint transition-colors">
            Haiku Business
          </Link>
          <h1 className="font-display text-3xl lg:text-4xl font-bold mt-6">
            Política de Privacidad
          </h1>
          <p className="text-gray-400 mt-2">Última actualización: 17 de marzo de 2026</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-12 lg:py-16">
        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 font-body text-[15px] leading-relaxed">

          <section>
            <h2 className="font-display text-xl font-bold text-haiku-black">1. Responsable del tratamiento</h2>
            <p>
              <strong>Haiku | Automatizaciones y procesos</strong> (en adelante, &quot;Haiku Business&quot;), con domicilio en Lima, Perú, es responsable del tratamiento de los datos personales recogidos a través del sitio web <strong>haiku.pe</strong> y sus aplicaciones asociadas.
            </p>
            <p>Correo de contacto: <strong>hola@haikubs.com</strong></p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-haiku-black">2. Datos que recopilamos</h2>
            <p>Recopilamos los siguientes datos personales según el contexto de uso:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Datos de contacto:</strong> nombre, correo electrónico, número de WhatsApp.</li>
              <li><strong>Datos de formulario de contacto:</strong> nombre, correo electrónico, número de WhatsApp (opcional) y mensaje.</li>
              <li><strong>Datos de Facebook/Meta:</strong> si inicias sesión o interactúas con nuestra app a través de Facebook, podemos recibir tu identificador de usuario (ID), nombre y correo electrónico asociado a tu cuenta de Facebook, según los permisos que otorgues.</li>
              <li><strong>Datos de navegación:</strong> información anónima de uso mediante herramientas de analítica (Microsoft Clarity) como páginas visitadas, tiempo de sesión y tipo de dispositivo.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-haiku-black">3. Finalidad del tratamiento</h2>
            <p>Utilizamos tus datos para:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Enviarte los recursos gratuitos que solicites (guías, plantillas, herramientas).</li>
              <li>Responder tus consultas a través del formulario de contacto.</li>
              <li>Enviarte comunicaciones relacionadas con nuestros servicios de automatización e IA.</li>
              <li>Mejorar la experiencia de usuario en nuestro sitio web.</li>
              <li>Gestionar tu interacción con nuestra aplicación de Meta/Facebook.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-haiku-black">4. Base legal</h2>
            <p>
              El tratamiento de tus datos se basa en tu <strong>consentimiento</strong>, otorgado al completar nuestros formularios o al interactuar con nuestra app de Facebook, y en nuestro <strong>interés legítimo</strong> de mejorar nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-haiku-black">5. Compartición de datos con terceros</h2>
            <p>Compartimos datos exclusivamente con los siguientes proveedores que necesitamos para operar nuestro servicio:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Resend:</strong> para el envío de correos electrónicos transaccionales.</li>
              <li><strong>Neon (PostgreSQL):</strong> almacenamiento seguro de datos en la nube.</li>
              <li><strong>Vercel:</strong> hosting de la plataforma web.</li>
              <li><strong>Microsoft Clarity:</strong> analítica anónima de comportamiento en el sitio.</li>
              <li><strong>Meta/Facebook:</strong> si usas Facebook Login o interactúas con nuestra app en la plataforma de Meta, ciertos datos se comparten con Meta según sus políticas.</li>
            </ul>
            <p>No vendemos, alquilamos ni cedemos tus datos a terceros con fines comerciales.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-haiku-black">6. Retención de datos</h2>
            <p>
              Conservamos tus datos personales mientras exista una relación activa o mientras sean necesarios para los fines descritos. Puedes solicitar la eliminación de tus datos en cualquier momento (ver sección 7).
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-haiku-black">7. Tus derechos</h2>
            <p>Puedes ejercer los siguientes derechos en cualquier momento:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Acceso:</strong> solicitar una copia de los datos que tenemos sobre ti.</li>
              <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
              <li><strong>Eliminación:</strong> solicitar que eliminemos todos tus datos personales.</li>
              <li><strong>Oposición:</strong> oponerte al tratamiento de tus datos.</li>
              <li><strong>Portabilidad:</strong> recibir tus datos en un formato estructurado.</li>
            </ul>
            <p>
              Para ejercer cualquier derecho, envía un correo a <strong>hola@haikubs.com</strong> con el asunto &quot;Derechos de privacidad&quot;. Responderemos en un plazo máximo de 30 días.
            </p>
            <p>
              Si has interactuado con nuestra app a través de Facebook, también puedes solicitar la eliminación de tus datos en nuestra <Link href="/eliminacion-datos" className="text-haiku-mint hover:underline font-semibold">página de eliminación de datos</Link>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-haiku-black">8. Seguridad</h2>
            <p>
              Implementamos medidas técnicas y organizativas para proteger tus datos, incluyendo cifrado en tránsito (HTTPS/TLS), almacenamiento seguro con acceso restringido y contraseñas hasheadas con bcrypt.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-haiku-black">9. Cookies y tecnologías similares</h2>
            <p>
              Nuestro sitio utiliza cookies esenciales para la autenticación y funcionalidad, y scripts de analítica (Microsoft Clarity) que recopilan datos anónimos de navegación. No utilizamos cookies publicitarias propias.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-haiku-black">10. Cambios en esta política</h2>
            <p>
              Podemos actualizar esta política periódicamente. Publicaremos cualquier cambio en esta página con la fecha de actualización correspondiente. Te recomendamos revisarla periódicamente.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-haiku-black">11. Contacto</h2>
            <p>
              Si tienes preguntas sobre esta política de privacidad, contáctanos en:
            </p>
            <ul className="list-none space-y-1">
              <li><strong>Email:</strong> hola@haikubs.com</li>
              <li><strong>Empresa:</strong> Haiku | Automatizaciones y procesos</li>
              <li><strong>Ubicación:</strong> Lima, Perú</li>
            </ul>
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
