const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL!;
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY!;
const EVOLUTION_INSTANCE = process.env.EVOLUTION_INSTANCE || 'Stiven';

interface SendTextResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export async function sendWhatsApp(
  phone: string,
  text: string
): Promise<SendTextResult> {
  const number = phone.replace(/[\s+\-()]/g, '');

  try {
    const res = await fetch(
      `${EVOLUTION_API_URL}/message/sendText/${EVOLUTION_INSTANCE}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: EVOLUTION_API_KEY,
        },
        body: JSON.stringify({ number, text }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error('[Evolution API] Error:', err);
      return { success: false, error: err };
    }

    const data = await res.json();
    return { success: true, messageId: data.key?.id };
  } catch (error) {
    console.error('[Evolution API] Fetch failed:', error);
    return { success: false, error: String(error) };
  }
}
