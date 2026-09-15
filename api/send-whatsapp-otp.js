import crypto from 'node:crypto';

const SECRET = process.env.OTP_SECRET || 'riseuphelp_secret_otp_signing_2026';
const META_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN || process.env.META_WHATSAPP_TOKEN || '';
const META_PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID || '';
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
    const { phone, donorName } = req.body || {};
    const cleanPhone = String(phone || '').replace(/\D/g, '').slice(-10);

    if (cleanPhone.length !== 10) {
      return res.status(400).json({ success: false, error: 'Please enter a valid 10-digit mobile number' });
    }

    // Generate secure 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const timestamp = Date.now();

    // Cryptographic HMAC signature (compatible with verify-otp.js)
    const signature = crypto
      .createHmac('sha256', SECRET)
      .update(`${cleanPhone}:${otp}:${timestamp}`)
      .digest('hex');
    const token = `${timestamp}.${signature}`;

    let whatsappDispatched = false;
    let providerUsed = 'none';

    // 1. Dispatch via Official Meta WhatsApp Cloud API
    if (META_TOKEN && META_PHONE_ID) {
      try {
        const metaRes = await fetch(
          `https://graph.facebook.com/v20.0/${META_PHONE_ID}/messages`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${META_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messaging_product: 'whatsapp',
              to: `91${cleanPhone}`,
              type: 'template',
              template: {
                name: process.env.WHATSAPP_TEMPLATE_NAME || 'riseuphelp_otp',
                language: { code: 'en_US' },
                components: [
                  {
                    type: 'body',
                    parameters: [{ type: 'text', text: otp }],
                  },
                  {
                    type: 'button',
                    sub_type: 'url',
                    index: '0',
                    parameters: [{ type: 'text', text: otp }],
                  },
                ],
              },
            }),
          }
        );
        const metaData = await metaRes.json();
        if (metaData && metaData.messages && metaData.messages.length > 0) {
          whatsappDispatched = true;
          providerUsed = 'meta_cloud_api';
        }
      } catch (metaErr) {
        console.warn('[send-whatsapp-otp] Meta API error:', metaErr);
      }
    }

    // 2. Dispatch via Gupshup WhatsApp API (if configured)
    if (!whatsappDispatched && GUPSHUP_KEY) {
      try {
        const params = new URLSearchParams();
        params.append('channel', 'whatsapp');
        params.append('source', GUPSHUP_SRC);
        params.append('destination', `91${cleanPhone}`);
        params.append(
          'message',
          JSON.stringify({
            type: 'text',
            text: `Namaste ${donorName || 'Donor'}! Your RiseUpHelp verification code is ${otp}. Valid for 10 minutes.`,
          })
        );

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
          whatsappDispatched = true;
          providerUsed = 'gupshup';
        }
      } catch (gErr) {
        console.warn('[send-whatsapp-otp] Gupshup API error:', gErr);
      }
    }

    return res.status(200).json({
      success: true,
      phone: cleanPhone,
      whatsappDispatched,
      providerUsed,
      token,
      otp,
      message: whatsappDispatched
        ? 'Official WhatsApp OTP dispatched successfully'
        : 'WhatsApp OTP generated (Awaiting API credentials in environment variables)',
    });
  } catch (err) {
    console.error('[send-whatsapp-otp] Fatal error:', err);
    return res.status(500).json({ success: false, error: 'Server error processing WhatsApp OTP' });
  }
}
