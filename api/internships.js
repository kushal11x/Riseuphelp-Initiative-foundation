import fs from 'node:fs';
import path from 'node:path';

const TMP_FILE = path.join('/tmp', 'internships.json');

const INITIAL_FALLBACK = [
  {
    id: 'int-seed-01',
    fullName: 'Priya Choudhary',
    email: 'priya.choudhary@gmail.com',
    phone: '9829123450',
    state: 'Rajasthan',
    city: 'Jaipur',
    qualification: "Undergraduate (Bachelor's - 2nd Year)",
    institution: 'University of Rajasthan',
    course: 'BBA',
    interestTrack: 'Healthcare & Hospital Bedside Patient Relief',
    status: 'selected_ground',
    assignedTrack: 'Ground Hospital & Patient Relief (RUHS & SMS)',
    timestamp: '2026-11-14T09:30:00.000Z'
  },
  {
    id: 'int-seed-02',
    fullName: 'Aman Verma',
    email: 'aman.verma.eco@delhi.ac.in',
    phone: '9811456782',
    state: 'Delhi NCR',
    city: 'Delhi',
    qualification: 'Undergraduate (Final Year / Graduating)',
    institution: 'Delhi University (Kirori Mal College)',
    course: 'BA Economics Hons',
    interestTrack: 'Slum Maternal & Infant Nutrition Policy Research',
    status: 'selected_remote',
    assignedTrack: 'Research & Strategy Proposal: Slum Maternal Nutrition',
    timestamp: '2026-11-16T14:15:00.000Z'
  },
  {
    id: 'int-seed-03',
    fullName: 'Kavya Sharma',
    email: 'kavya.sharma99@gmail.com',
    phone: '9784561230',
    state: 'Rajasthan',
    city: 'Jaipur',
    qualification: 'Engineering / Technical Degree',
    institution: 'JECRC University',
    course: 'B.Tech Computer Science',
    interestTrack: 'Underprivileged Child Education & STEM Mentorship',
    status: 'under_review',
    timestamp: '2026-11-18T16:40:00.000Z'
  }
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
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

    return res.status(200).json({
      success: true,
      internships: list,
    });
  } catch (err) {
    console.error('[internships] Server error:', err);
    return res.status(200).json({
      success: true,
      internships: INITIAL_FALLBACK,
    });
  }
}
