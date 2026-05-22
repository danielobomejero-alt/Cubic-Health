import type { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!process.env.GOOGLE_SHEET_ID) throw new Error('GOOGLE_SHEET_ID is missing in environment variables');
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) throw new Error('GOOGLE_SERVICE_ACCOUNT_EMAIL is missing');
    if (!process.env.GOOGLE_PRIVATE_KEY) throw new Error('GOOGLE_PRIVATE_KEY is missing');
    
    // Google Sheets Auth
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

    const { data } = req.body;
    const values = [
      [
        new Date().toISOString(),
        data.fullName || 'Anonymous',
        data.age,
        data.sex,
        data.bpSystolic,
        data.bpDiastolic,
        data.cholesterol,
        data.smoking ? 'Yes' : 'No',
        data.diabetes ? 'Yes' : 'No',
        data.physicalActivity,
        data.riskScore + '%',
        data.riskCategory
      ]
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'RiskAssessments!A:L',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    });

    res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Google Sheets Sync Error (Risk):', error.message);
    res.status(500).json({ error: error.message });
  }
}
