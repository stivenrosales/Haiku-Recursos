import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const propuesta = await prisma.propuesta.create({
    data: {
      clienteNombre: 'Grifos San Ignacio',
      vigenciaHasta: new Date('2026-05-09T23:59:59.000Z'),
      servicios: [
        {
          titulo: 'Integración de WhatsApp API con Meta',
          precio: 'S/ 1,000',
          tipoPago: 'Pago único',
          descripcion: 'Migración completa a WhatsApp Business API con verificación oficial de Meta.',
          items: [
            '2 a 3 reuniones de planificación y migración',
            'Uso del mismo número actual o uno nuevo',
            'Validación del negocio para el check de verificación de Meta',
            'Capacitación completa al equipo',
            'Propuesta de herramienta de gestión (Chatwoot, Manychat u otra)',
            'Configuración de plantillas y flujos iniciales',
          ],
        },
        {
          titulo: 'Número provisional para mensajes masivos',
          precio: 'S/ 200/semana',
          tipoPago: 'Mientras el número esté activo',
          descripcion: 'Haiku presta un número de teléfono verificado para envío de campañas masivas por WhatsApp.',
          items: [
            'Número de WhatsApp API proporcionado por Haiku',
            'Configuración y envío de campañas masivas',
            'Costo por mensaje asumido por el cliente: $0.0703 USD por mensaje enviado',
            'Soporte durante el periodo activo',
          ],
        },
      ],
    },
  });

  console.log(`Propuesta creada: /propuesta/${propuesta.slug}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
