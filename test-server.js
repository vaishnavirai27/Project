const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Translation API credentials (for Google Cloud Translate API example)
const API_KEY = 'YOUR_GOOGLE_API_KEY';  // You need to replace this with your Google API key
const GOOGLE_TRANSLATE_API_URL = 'https://translation.googleapis.com/language/translate/v2';

// Translation endpoint
app.post('/translate', async (req, res) => {
    const { text, targetLanguage } = req.body;

    if (!text || !targetLanguage) {
        return res.status(400).json({ error: 'Missing text or targetLanguage in request' });
    }

    try {
        const response = await axios.post(GOOGLE_TRANSLATE_API_URL, null, {
            params: {
                q: text,
                target: targetLanguage,
                key: API_KEY
            }
        });

        // Get translated text from the response
        const translatedText = response.data.data.translations[0].translatedText;

        // Return the translated text as a JSON response
        return res.json({ translatedText });
    } catch (error) {
        console.error('Error translating text:', error);
        return res.status(500).json({ error: 'Failed to translate text' });
    }
});

// Serve static files
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(Server is running on http://localhost:${port});
});
