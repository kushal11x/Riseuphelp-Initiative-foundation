import fs from 'node:fs';
import path from 'node:path';

const TMP_FILE = path.join('/tmp', 'volunteers.json');

const INITIAL_FALLBACK = [
  {
    id: "vol-seed-01",
    fullName: "Rahul Sharma",
    phone: "9828291119",
    email: "rahul.sharma@gmail.com",
    city: "Jaipur",
    track: "Hospital Bedside Coconut Seva (RUHS & SMS)",
    availability: "Sundays & Ekadashi Mornings",
    status: "approved",
    timestamp: "2026-09-12T10:30:00.000Z"
  },
  {
    id: "vol-seed-02",
    fullName: "Anjali Meena",
    phone: "9660618723",
    email: "anjali.m@outlook.com",
    city: "Jaipur",
    track: "Weekend Slum Digital & STEM Mentorship",
    availability: "Weekend Afternoons (Saturday/Sunday)",
    status: "contacted",
    timestamp: "2026-09-13T08:15:00.000Z"
  },
  {
    id: "vol-seed-03",
    fullName: "Vikram Rathore",
    phone: "8503076048",
    email: "vikram.rathore.jpr@gmail.com",
    city: "Jaipur",
    track: "Emergency Relief & Rapid Distribution Squad",
    availability: "On-Call Emergency Shifts",
    status: "approved",
    timestamp: "2026-09-13T11:45:00.000Z"
  }
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const data = req.body || {};
    const newVolunteer = {
      id: data.id || `vol-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      fullName: data.fullName || 'Anonymous Volunteer',
      phone: data.phone || '',
      email: data.email || '',
      city: data.city || 'Jaipur',
      track: data.track || 'Hospital Bedside Coconut Seva (RUHS & SMS)',
      availability: data.availability || 'Sundays & Ekadashi Mornings',
      status: 'pending',
      timestamp: data.timestamp || new Date().toISOString(),
    };

    let list = [];
    if (fs.existsSync(TMP_FILE)) {
      try {
        list = JSON.parse(fs.readFileSync(TMP_FILE, 'utf-8'));
      } catch {
        list = [...INITIAL_FALLBACK];
      }
    } else {
      list = [...INITIAL_FALLBACK];
    }

    list = list.filter((v) => v.id !== newVolunteer.id);
    list.unshift(newVolunteer);

    try {
      fs.writeFileSync(TMP_FILE, JSON.stringify(list, null, 2), 'utf-8');
    } catch {}

    return res.status(200).json({
      success: true,
      volunteer: newVolunteer,
      total: list.length,
    });
  } catch (err) {
    console.error('[submit-volunteer] Server error:', err);
    return res.status(500).json({ success: false, error: err?.message || 'Server error' });
  }
}
