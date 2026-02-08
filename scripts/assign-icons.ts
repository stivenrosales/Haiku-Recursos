/**
 * Script para auto-asignar íconos a recursos existentes
 * basándose en su título y descripción.
 *
 * Ejecutar: npx tsx scripts/assign-icons.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const KEYWORD_MAP: [string[], string][] = [
  [['excel', 'hoja de cálculo', 'spreadsheet', 'tabla'], 'FileSpreadsheet'],
  [['checklist', 'check list', 'verificación'], 'FileCheck'],
  [['automatización', 'automati', 'workflow', 'flujo'], 'Bot'],
  [['inteligencia artificial', ' ia ', 'chatgpt', 'gpt', 'prompt'], 'Bot'],
  [['marketing', 'publicidad', 'ads', 'campaña'], 'Megaphone'],
  [['email', 'correo', 'newsletter', 'mailing'], 'Mail'],
  [['calendario', 'agenda', 'planificador', 'schedule'], 'Calendar'],
  [['finanzas', 'presupuesto', 'dinero', 'inversión', 'costos'], 'DollarSign'],
  [['equipo', 'rrhh', 'personas', 'contratación'], 'Users'],
  [['web', 'sitio', 'página', 'seo', 'online'], 'Globe'],
  [['rápido', 'eficiente', 'productividad', 'velocidad'], 'Zap'],
  [['estrategia', 'objetivo', 'meta', 'kpi'], 'Target'],
  [['herramienta', 'toolkit', 'kit'], 'Wrench'],
  [['guía', 'guia', 'manual', 'tutorial', 'curso'], 'BookOpen'],
  [['presentación', 'slides', 'pitch', 'deck'], 'Presentation'],
  [['idea', 'consejo', 'tips', 'innovación'], 'Lightbulb'],
  [['crecimiento', 'escalar', 'ventas', 'métricas'], 'TrendingUp'],
  [['lanzamiento', 'startup', 'negocio nuevo'], 'Rocket'],
  [['plantilla', 'template', 'documento', 'pdf'], 'FileText'],
  [['descarga', 'recurso', 'gratis'], 'Download'],
];

function assignIcon(titulo: string, descripcion: string): string {
  const text = `${titulo} ${descripcion}`.toLowerCase();

  for (const [keywords, iconName] of KEYWORD_MAP) {
    for (const keyword of keywords) {
      if (text.includes(keyword.toLowerCase())) {
        return iconName;
      }
    }
  }

  return 'FileText'; // Default
}

async function main() {
  const recursos = await prisma.recurso.findMany({
    select: { id: true, titulo: true, descripcion: true, icono: true },
  });

  console.log(`Encontrados ${recursos.length} recursos.\n`);

  for (const recurso of recursos) {
    const newIcon = assignIcon(recurso.titulo, recurso.descripcion);
    const status = recurso.icono ? `(ya tenía: ${recurso.icono})` : '(sin ícono)';

    await prisma.recurso.update({
      where: { id: recurso.id },
      data: { icono: newIcon },
    });

    console.log(`✅ ${recurso.titulo} → ${newIcon} ${status}`);
  }

  console.log('\n🎉 Íconos asignados correctamente.');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
