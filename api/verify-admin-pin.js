import crypto from 'node:crypto';

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
    const { pin } = req.body || {};
    const serverPin = String(process.env.ADMIN_PIN || '9828').trim();

    if (String(pin).trim() === serverPin) {
      const token = `ruh_adm_${crypto.randomBytes(32).toString('hex')}`;
      const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
      return res.status(200).json({ success: true, token, expiresAt });
    } else {
      return res.status(401).json({ success: false, error: 'Invalid Security PIN' });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
