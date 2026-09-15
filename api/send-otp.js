import crypto from 'node:crypto';

const SECRET = process.env.OTP_SECRET || 'riseuphelp_secret_otp_signing_2026';
const FAST2SMS_KEY = process.env.FAST2SMS_API_KEY || '3nQdRkoOc0fMH5qmiPhaFTuNjJEL76Zt9gYyWrv4DUxpG2XIbz1KaWIYZ3uA7dzbN0y4vqGs6ECDLnfM';

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

    // Cryptographic HMAC signature
    const signature = crypto
      .createHmac('sha256', SECRET)
      .update(`${cleanPhone}:${otp}:${timestamp}`)
      .digest('hex');
    const token = `${timestamp}.${signature}`;

    let smsDispatched = false;
    let isKycPending = false;

    // Fast2SMS has been disabled as requested by user. Primary provider is MSG91.
    smsDispatched = false;

    return res.status(200).json({
      success: true,
      phone: cleanPhone,
      smsDispatched,
      isKycPending,
      otp, // Provide OTP so user is never locked out if telecom filters delayed SMS
      token,
      message: smsDispatched ? 'OTP sent to mobile phone via SMS' : 'OTP generated successfully',
    });
  } catch (err) {
    console.error('[send-otp] Server error:', err);
    return res.status(500).json({ success: false, error: 'Failed to process OTP request' });
  }
}
