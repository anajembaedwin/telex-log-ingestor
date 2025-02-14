const axios = require('axios');

async function sendLogToTelex(webhookUrl, logLevel, message) {
  try {
    const response = await axios.post(webhookUrl, {
      event_name: 'Log Event',
      logLevel,
      message,
      status: 'success'
    });
    return response.data;
  } catch (error) {
    console.error('Failed to send log to Telex:', error.message);
    throw error;
  }
}

module.exports = { sendLogToTelex };
