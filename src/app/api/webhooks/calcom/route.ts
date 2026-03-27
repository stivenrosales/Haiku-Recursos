import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { prisma } from '@/lib/prisma';
import { sendWhatsApp } from '@/lib/evolution-api';
import { mensajeConfirmacion, mensajeCancelacion } from '@/lib/booking-messages';

function verifyWebhook(rawBody: string, signature: string | null): boolean {
  const secret = process.env.CALCOM_WEBHOOK_SECRET;
  if (!secret) return false;
  if (!signature) return false;

  const hmac = createHmac('sha256', secret).update(rawBody).digest('hex');
  return hmac === signature;
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get('x-cal-signature-256');

  if (!verifyWebhook(rawBody, signature)) {
    console.warn('[Cal.com Webhook] Invalid signature');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = JSON.parse(rawBody);
    const { triggerEvent, payload } = body;

    console.log(`[Cal.com Webhook] Event: ${triggerEvent}`);

    if (triggerEvent === 'BOOKING_CREATED') {
      return handleBookingCreated(payload);
    }

    if (triggerEvent === 'BOOKING_CANCELLED') {
      return handleBookingCancelled(payload);
    }

    if (triggerEvent === 'BOOKING_RESCHEDULED') {
      return handleBookingRescheduled(payload);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[Cal.com Webhook] Error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

async function handleBookingCreated(payload: any) {
  const attendee = payload.attendees?.[0];
  if (!attendee) {
    return NextResponse.json({ error: 'No attendee' }, { status: 400 });
  }

  console.log('[Cal.com Webhook] Responses:', JSON.stringify(payload.responses));
  console.log('[Cal.com Webhook] Attendee:', JSON.stringify(attendee));

  const telefono =
    payload.responses?.phone?.value ||
    payload.responses?.attendeePhoneNumber?.value ||
    payload.responses?.telefono?.value ||
    attendee?.phone ||
    '';

  if (!telefono) {
    console.warn('[Cal.com Webhook] No phone number found in booking');
    return NextResponse.json({ received: true, warning: 'no phone' });
  }

  const booking = await prisma.booking.create({
    data: {
      calBookingId: payload.bookingId,
      titulo: payload.title || 'Asesoría Haiku',
      nombre: attendee.name,
      email: attendee.email,
      telefono,
      fechaReunion: new Date(payload.startTime),
      timezone: attendee.timeZone || 'America/Lima',
      estado: 'confirmed',
    },
  });

  const mensaje = mensajeConfirmacion(attendee.name, new Date(payload.startTime));
  const result = await sendWhatsApp(telefono, mensaje);

  await prisma.booking.update({
    where: { id: booking.id },
    data: { confirmacionEnviada: result.success },
  });

  console.log(
    `[Cal.com Webhook] Booking created: ${booking.id}, WhatsApp sent: ${result.success}`
  );

  return NextResponse.json({ received: true, bookingId: booking.id });
}

async function handleBookingCancelled(payload: any) {
  const booking = await prisma.booking.findUnique({
    where: { calBookingId: payload.bookingId },
  });

  if (!booking) {
    return NextResponse.json({ received: true, warning: 'booking not found' });
  }

  await prisma.booking.update({
    where: { id: booking.id },
    data: { estado: 'cancelled' },
  });

  const mensaje = mensajeCancelacion(booking.nombre);
  await sendWhatsApp(booking.telefono, mensaje);

  return NextResponse.json({ received: true });
}

async function handleBookingRescheduled(payload: any) {
  const booking = await prisma.booking.findUnique({
    where: { calBookingId: payload.bookingId },
  });

  if (booking) {
    await prisma.booking.update({
      where: { id: booking.id },
      data: {
        fechaReunion: new Date(payload.startTime),
        estado: 'confirmed',
        recordatorioManana: false,
        recordatorio2h: false,
        recordatorio1h: false,
        recordatorio10min: false,
      },
    });

    const attendee = payload.attendees?.[0];
    const mensaje = mensajeConfirmacion(
      attendee?.name || booking.nombre,
      new Date(payload.startTime)
    );
    await sendWhatsApp(booking.telefono, mensaje);
  }

  return NextResponse.json({ received: true });
}
