import fs from 'node:fs';
import path from 'node:path';
import nodemailer from 'nodemailer';

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
    const newSubmission = {
      id: data.id || `RUH-INT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`,
      fullName: data.fullName || 'Anonymous Scholar',
      email: data.email || '',
      phone: data.phone || '',
      alternatePhone: data.alternatePhone || '',
      ageBracket: data.ageBracket || '',
      gender: data.gender || '',
      state: data.state || 'Rajasthan',
      city: data.city || 'Jaipur',
      qualification: data.qualification || '',
      academicDiscipline: data.academicDiscipline || '',
      institution: data.institution || 'Independent Scholar',
      course: data.course || data.qualification || '',
      graduationYear: data.graduationYear || '',
      linkedInOrPortfolio: data.linkedInOrPortfolio || undefined,
      priorExperience: data.priorExperience || '',
      interestTrack: data.interestTrack || '',
      weeklyHours: data.weeklyHours || data.weeklyAvailability || '',
      coreSkills: data.coreSkills || [],
      analyticalResponse: data.analyticalResponse || undefined,
      groundDignityResponse: data.groundDignityResponse || undefined,
      researchTopicPreference: data.researchTopicPreference || undefined,
      whyJoin: data.whyJoin || undefined,
      status: data.status || 'pending',
      assignedTrack: data.assignedTrack || undefined,
      timestamp: data.timestamp || new Date().toISOString(),
    };

    // 1. Try to read and persist to /tmp
    let list = [];
    try {
      if (fs.existsSync(TMP_FILE)) {
        list = JSON.parse(fs.readFileSync(TMP_FILE, 'utf-8'));
      } else {
        list = [...INITIAL_FALLBACK];
      }
    } catch {
      list = [...INITIAL_FALLBACK];
    }

    list = list.filter((item) => item.id !== newSubmission.id);
    list.unshift(newSubmission);

    try {
      fs.writeFileSync(TMP_FILE, JSON.stringify(list, null, 2), 'utf-8');
    } catch (fsErr) {
      console.warn('[submit-internship] /tmp write warning:', fsErr?.message);
    }

    // 2. Dispatch Email Alert to Admin/Foundation inbox (non-blocking)
    const emailUser = process.env.EMAIL_USER || process.env.GMAIL_USER || 'support@riseuphelp.org';
    const emailPass = process.env.EMAIL_PASSWORD || process.env.GMAIL_APP_PASSWORD;

    if (emailPass) {
      try {
        const isGmail = emailUser.endsWith('@gmail.com');
        const transporter = nodemailer.createTransport(
          isGmail
            ? {
                service: 'gmail',
                auth: { user: emailUser, pass: emailPass.replace(/\s+/g, '') },
              }
            : {
                host: process.env.SMTP_HOST || 'smtpout.secureserver.net',
                port: Number(process.env.SMTP_PORT) || 465,
                secure: true,
                auth: { user: emailUser, pass: emailPass },
                tls: { rejectUnauthorized: false },
              }
        );

        // Alert to foundation secretariat
        transporter.sendMail({
          from: `"RiseUp Fellowship Portal" <${emailUser}>`,
          to: emailUser,
          subject: `🎓 New Fellowship Application: ${newSubmission.fullName} (${newSubmission.city})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px;">
              <h2 style="color: #084c36; margin-bottom: 8px;">🎓 New Fellowship Application Received</h2>
              <p style="color: #666; font-size: 13px;">Rise Up Help Initiative Foundation — National Youth Cohort Admissions</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 15px 0;" />
              <table style="width: 100%; font-size: 14px; line-height: 1.6;">
                <tr><td style="font-weight: bold; width: 35%;">Application ID:</td><td><code>${newSubmission.id}</code></td></tr>
                <tr><td style="font-weight: bold;">Candidate Name:</td><td>${newSubmission.fullName}</td></tr>
                <tr><td style="font-weight: bold;">Email:</td><td><a href="mailto:${newSubmission.email}">${newSubmission.email}</a></td></tr>
                <tr><td style="font-weight: bold;">WhatsApp Phone:</td><td>${newSubmission.phone || 'N/A'}</td></tr>
                <tr><td style="font-weight: bold;">Location:</td><td>${newSubmission.city}, ${newSubmission.state}</td></tr>
                <tr><td style="font-weight: bold;">College / Univ:</td><td>${newSubmission.institution} (${newSubmission.course})</td></tr>
                <tr><td style="font-weight: bold;">Track Fit:</td><td>${newSubmission.city.toLowerCase().includes('jaipur') ? '🏛️ Ground Bedside Hospital Care (Jaipur)' : '📄 Remote Maternal Nutrition Research Dossier'}</td></tr>
                <tr><td style="font-weight: bold;">Weekly Hours:</td><td>${newSubmission.weeklyHours || '8-12 hrs/week'}</td></tr>
              </table>
              <div style="margin-top: 15px; background: #faf8f5; padding: 12px; border-radius: 8px;">
                <strong>Statement of Purpose / Why Join:</strong>
                <p style="margin: 6px 0 0 0; color: #444; font-size: 13px;">${newSubmission.whyJoin || 'Not provided'}</p>
              </div>
              <p style="margin-top: 20px; font-size: 12px; color: #888;">This application has been recorded in the system. Log into the RiseUp Admin Portal to review or issue selection letters.</p>
            </div>
          `,
        }).catch((e) => console.warn('[submit-internship] Mail dispatch warning:', e?.message));
      } catch (mErr) {
        console.warn('[submit-internship] Transporter init warning:', mErr?.message);
      }
    }

    return res.status(200).json({
      success: true,
      submission: newSubmission,
      total: list.length,
      internships: list,
    });
  } catch (err) {
    console.error('[submit-internship] Server error:', err);
    return res.status(500).json({ success: false, error: err?.message || 'Server error' });
  }
}
