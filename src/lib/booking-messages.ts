import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toZonedTime } from 'date-fns-tz';

const LIMA_TZ = 'America/Lima';

function formatFechaLima(fecha: Date): string {
  const limaDate = toZonedTime(fecha, LIMA_TZ);
  return format(limaDate, "EEEE d 'de' MMMM", { locale: es });
}

function formatHoraLima(fecha: Date): string {
  const limaDate = toZonedTime(fecha, LIMA_TZ);
  return format(limaDate, 'h:mm a', { locale: es });
}

export function mensajeConfirmacion(nombre: string, fecha: Date): string {
  return `¡Hola ${nombre}! 👋

Tu asesoría con Haiku está confirmada:

📅 ${formatFechaLima(fecha)}
🕐 ${formatHoraLima(fecha)}
⏱️ 30 minutos

En esta sesión veremos cómo automatizar tus ventas por WhatsApp con IA.

Si necesitas reagendar, puedes hacerlo desde el link en tu email de confirmación.

¡Nos vemos! 🚀`;
}

export function mensajeRecordatorioManana(nombre: string, fecha: Date): string {
  return `Buenos días ${nombre} ☀️

Te recordamos que hoy tienes tu asesoría con Haiku a las ${formatHoraLima(fecha)}.

Prepárate para descubrir cómo la IA puede trabajar por ti en WhatsApp 💡

¡Te esperamos!`;
}

export function mensajeRecordatorio2h(nombre: string, fecha: Date): string {
  return `Hola ${nombre} 👋

Tu asesoría con Haiku es en 2 horas (${formatHoraLima(fecha)}).

¿Todo listo? Si tienes dudas previas, puedes escribirnos aquí.`;
}

export function mensajeRecordatorio1h(nombre: string, fecha: Date): string {
  return `${nombre}, tu asesoría es en 1 hora ⏰

📅 Hoy a las ${formatHoraLima(fecha)}

Asegúrate de tener buena conexión. ¡Nos vemos pronto!`;
}

export function mensajeRecordatorio10min(nombre: string, fecha: Date): string {
  return `¡${nombre}, empezamos en 10 minutos! 🎯

Revisa tu email para el link de la reunión.

¡Ya casi!`;
}

export function mensajeCancelacion(nombre: string): string {
  return `Hola ${nombre},

Tu asesoría con Haiku ha sido cancelada. Si deseas reagendar, visita: https://haikubs.com/#agendar

¡Esperamos verte pronto!`;
}
