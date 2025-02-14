require('dotenv').config();
const express = require('express');
const { sendLogToTelex } = require('./utils');

const app = express();
const PORT = process.env.PORT || 3000;
const TELELEX_WEBHOOK_URL = process.env.TELEX_WEBHOOK_URL;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Log Ingestor is running' });
});

app.post('/send-log', async (req, res) => {
  const { logLevel, message } = req.body;

  if (!logLevel || !message) {
    return res.status(400).json({ error: 'logLevel and message are required' });
  }

  try {
    const telexResponse = await sendLogToTelex(TELELEX_WEBHOOK_URL, logLevel, message);
    res.json({ status: 'success', telexResponse });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send log to Telex' });
  }
});

app.listen(PORT, () => {
  console.log(`Log Ingestor running on port ${PORT}`);
});
