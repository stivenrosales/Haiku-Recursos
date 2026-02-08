import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // Crear usuario admin con contraseña segura
  const hashedPassword = await bcrypt.hash('asdvu12db!!xas8m@@', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@haiku.pe' },
    update: { password: hashedPassword }, // Actualiza la contraseña si ya existe
    create: {
      email: 'admin@haiku.pe',
      password: hashedPassword,
      name: 'Admin Haiku',
    },
  });

  console.log('✅ Usuario admin actualizado:', admin.email);

  // Crear recurso de ejemplo
  const recurso = await prisma.recurso.upsert({
    where: { slug: 'guia-automatizacion' },
    update: {},
    create: {
      titulo: 'Guía de Automatización con IA',
      slug: 'guia-automatizacion',
      descripcion: 'Descubre cómo automatizar tus procesos empresariales usando inteligencia artificial y herramientas no-code.',
      urlRecurso: 'https://drive.google.com/file/d/ejemplo',
      icono: 'Bot',
      emailAsunto: '¡Tu Guía de Automatización está lista! 🎁',
      emailCuerpo: 'Hola {{nombre}},\n\nGracias por tu interés en automatización. Aquí está tu guía:\n\n👉 [DESCARGAR GUÍA]({{urlRecurso}})\n\n¡Éxito!\nStiven - Haiku Business',
      activo: true,
    },
  });

  console.log('✅ Recurso de ejemplo creado:', recurso.slug);
  console.log('🎉 Seed completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
