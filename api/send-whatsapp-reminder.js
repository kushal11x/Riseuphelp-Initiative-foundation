const ULTRAMSG_INSTANCE = process.env.ULTRAMSG_INSTANCE_ID || '';
const ULTRAMSG_TOKEN = process.env.ULTRAMSG_TOKEN || '';
const GUPSHUP_KEY = process.env.GUPSHUP_API_KEY || '';
const GUPSHUP_SRC = process.env.GUPSHUP_SRC_NAME || 'RiseUpHelp';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { phone, donorName, title, date, hospital, customMessage } = req.body || {};
    const cleanPhone = String(phone || '').replace(/\D/g, '').slice(-10);

    if (cleanPhone.length !== 10) {
      return res.status(400).json({ success: false, error: 'Valid 10-digit phone number is required' });
    }

    const messageText =
      customMessage ||
      `Namaste ${donorName || 'Patron'} Ji! 🙏\n\n` +
      `RiseUpHelp Har Ekadashi Bedside Seva Reminder:\n` +
      `🌸 *${title || 'Har Ekadashi Bedside Seva'}*\n` +
      `📅 Date: *${date || 'Upcoming Ekadashi'}*\n` +
      `🏥 Hospital: *${hospital || 'RUHS State Cancer Hospital, Jaipur'}*\n\n` +
      `Fresh tender coconuts will be cut live bedside for admitted cancer patients undergoing chemotherapy.\n\n` +
      `Sponsor or view seva details: https://riseuphelp.org\n` +
      `Helpline: wa.me/919828291119\n\n` +
      `RiseUpHelp Initiative Foundation (Section 8 Non-Profit)`;

    let sent = false;

    // 1. UltraMsg (WhatsApp Business Gateway)
    if (ULTRAMSG_INSTANCE && ULTRAMSG_TOKEN) {
      try {
        const uParams = new URLSearchParams();
        uParams.append('token', ULTRAMSG_TOKEN);
        uParams.append('to', `+91${cleanPhone}`);
        uParams.append('body', messageText);

        const uRes = await fetch(`https://api.ultramsg.com/${ULTRAMSG_INSTANCE}/messages/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: uParams.toString(),
        });
        const uData = await uRes.json();
        if (uData && (uData.sent === 'true' || uData.sent === true || uData.id)) {
          sent = true;
        }
      } catch (err) {
        console.warn('[send-whatsapp-reminder] UltraMsg error:', err);
      }
    }

    // 2. Gupshup fallback
    if (!sent && GUPSHUP_KEY) {
      try {
        const params = new URLSearchParams();
        params.append('channel', 'whatsapp');
        params.append('source', GUPSHUP_SRC);
        params.append('destination', `91${cleanPhone}`);
        params.append('message', JSON.stringify({ type: 'text', text: messageText }));

        const gRes = await fetch('https://api.gupshup.io/wa/api/v1/msg', {
          method: 'POST',
          headers: {
            apikey: GUPSHUP_KEY,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params.toString(),
        });
        const gData = await gRes.json();
        if (gData && (gData.status === 'submitted' || gData.status === 'success')) {
          sent = true;
        }
      } catch (gErr) {
        console.warn('[send-whatsapp-reminder] Gupshup error:', gErr);
      }
    }

    return res.status(200).json({
      success: true,
      phone: cleanPhone,
      sent,
      message: sent
        ? 'Reminder dispatched via official WhatsApp'
        : 'Reminder generated (Awaiting WhatsApp Gateway QR link)',
    });
  } catch (err) {
    console.error('[send-whatsapp-reminder] Error:', err);
    return res.status(500).json({ success: false, error: 'Failed to send reminder' });
  }
}
