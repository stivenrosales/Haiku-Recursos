import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendWhatsApp } from '@/lib/evolution-api';
import {
  mensajeRecordatorioManana,
  mensajeRecordatorio2h,
  mensajeRecordatorio1h,
  mensajeRecordatorio10min,
} from '@/lib/booking-messages';

function verifyCron(req: NextRequest): boolean {
  const authHeader = req.headers.get('authorization');
  if (authHeader === `Bearer ${process.env.CRON_SECRET}`) return true;
  if (req.headers.get('x-vercel-cron') === '1') return true;
  return false;
}

export async function GET(req: NextRequest) {
  if (!verifyCron(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();
  const results = { morning: 0, twoHour: 0, oneHour: 0, tenMin: 0, errors: 0 };

  const upcomingBookings = await prisma.booking.findMany({
    where: {
      estado: 'confirmed',
      fechaReunion: {
        gte: now,
        lte: new Date(now.getTime() + 24 * 60 * 60 * 1000),
      },
      OR: [
        { recordatorioManana: false },
        { recordatorio2h: false },
        { recordatorio1h: false },
        { recordatorio10min: false },
      ],
    },
  });

  for (const booking of upcomingBookings) {
    const msUntilMeeting = booking.fechaReunion.getTime() - now.getTime();
    const minutesUntil = msUntilMeeting / (1000 * 60);

    try {
      // Morning reminder: 8:00-8:15 AM Lima time on the day of the meeting
      if (!booking.recordatorioManana && isMorningWindow(now, booking.fechaReunion)) {
        const msg = mensajeRecordatorioManana(booking.nombre, booking.fechaReunion);
        const res = await sendWhatsApp(booking.telefono, msg);
        if (res.success) {
          await prisma.booking.update({
            where: { id: booking.id },
            data: { recordatorioManana: true },
          });
          results.morning++;
        }
      }

      // 2h reminder: between 2h and 1h50m before
      if (!booking.recordatorio2h && minutesUntil <= 120 && minutesUntil > 110) {
        const msg = mensajeRecordatorio2h(booking.nombre, booking.fechaReunion);
        const res = await sendWhatsApp(booking.telefono, msg);
        if (res.success) {
          await prisma.booking.update({
            where: { id: booking.id },
            data: { recordatorio2h: true },
          });
          results.twoHour++;
        }
      }

      // 1h reminder: between 1h and 50m before
      if (!booking.recordatorio1h && minutesUntil <= 60 && minutesUntil > 50) {
        const msg = mensajeRecordatorio1h(booking.nombre, booking.fechaReunion);
        const res = await sendWhatsApp(booking.telefono, msg);
        if (res.success) {
          await prisma.booking.update({
            where: { id: booking.id },
            data: { recordatorio1h: true },
          });
          results.oneHour++;
        }
      }

      // 10min reminder: between 10min and 0min before
      if (!booking.recordatorio10min && minutesUntil <= 10 && minutesUntil > 0) {
        const msg = mensajeRecordatorio10min(booking.nombre, booking.fechaReunion);
        const res = await sendWhatsApp(booking.telefono, msg);
        if (res.success) {
          await prisma.booking.update({
            where: { id: booking.id },
            data: { recordatorio10min: true },
          });
          results.tenMin++;
        }
      }
    } catch (error) {
      console.error(`[Cron] Error processing booking ${booking.id}:`, error);
      results.errors++;
    }
  }

  console.log(`[Cron Reminders] Processed ${upcomingBookings.length} bookings:`, results);

  return NextResponse.json({
    ok: true,
    processed: upcomingBookings.length,
    sent: results,
  });
}

/**
 * Check if current time is in the 8:00-8:15 AM window (Lima time)
 * and the meeting is today (same day in Lima timezone)
 */
function isMorningWindow(now: Date, meetingDate: Date): boolean {
  const limaOffset = -5 * 60; // minutes
  const limaMinutes = now.getUTCHours() * 60 + now.getUTCMinutes() + limaOffset;
  const limaHour = ((limaMinutes / 60) + 24) % 24;

  if (limaHour < 8 || limaHour >= 8.25) return false;

  const nowLima = new Date(now.getTime() + limaOffset * 60 * 1000);
  const meetingLima = new Date(meetingDate.getTime() + limaOffset * 60 * 1000);

  return (
    nowLima.getUTCFullYear() === meetingLima.getUTCFullYear() &&
    nowLima.getUTCMonth() === meetingLima.getUTCMonth() &&
    nowLima.getUTCDate() === meetingLima.getUTCDate()
  );
}
