import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

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

  // API Routes
  app.get('/api/config-check', (req, res) => {
    res.json({
      hasSheetId: !!process.env.GOOGLE_SHEET_ID,
      hasEmail: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
      nodeEnv: process.env.NODE_ENV || 'development'
    });
  });

  app.post('/api/sync/risk', async (req, res) => {
    try {
      if (!process.env.GOOGLE_SHEET_ID) throw new Error('GOOGLE_SHEET_ID is missing in environment variables');
      if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) throw new Error('GOOGLE_SERVICE_ACCOUNT_EMAIL is missing');
      if (!process.env.GOOGLE_PRIVATE_KEY) throw new Error('GOOGLE_PRIVATE_KEY is missing');
      
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

      res.json({ success: true });
    } catch (error: any) {
      console.error('Google Sheets Sync Error (Risk):', error.message);
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/sync/enquiry', async (req, res) => {
    try {
      if (!process.env.GOOGLE_SHEET_ID) throw new Error('GOOGLE_SHEET_ID is missing in environment variables');
      if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) throw new Error('GOOGLE_SERVICE_ACCOUNT_EMAIL is missing');
      if (!process.env.GOOGLE_PRIVATE_KEY) throw new Error('GOOGLE_PRIVATE_KEY is missing');

      const { data } = req.body;
      const values = [
        [
          new Date().toISOString(),
          data.fullName,
          data.email,
          data.phone || 'N/A',
          data.message,
          data.interestedInConsultation ? 'Yes' : 'No'
        ]
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Enquiries!A:F',
        valueInputOption: 'USER_ENTERED',
        requestBody: { values },
      });

      res.json({ success: true });
    } catch (error: any) {
      console.error('Google Sheets Sync Error (Enquiry):', error.message);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
