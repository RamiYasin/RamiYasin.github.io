// Load environment variables from a .env file (if using .env for SUPABASE_KEY)

const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js'); // Use require for importing Supabase client

// Initialize Supabase client
const supabaseUrl = 'https://dxwozqqzyhtfygivsqbj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4d296cXF6eWh0ZnlnaXZzcWJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ3OTAzNjcsImV4cCI6MjA0MDM2NjM2N30.p3n52qcRudoQBcbyVdKzznEKyBnxulRK3kGCxXynWkg'; // Ensure this is set in your environment or .env file
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
app.use(cors()); // Enable CORS

// Endpoint to get all Thema data
app.get('/themas', async (req, res) => {
    try {
        const { data, error } = await supabase.from('thema').select('*');
        if (error) {
            throw error;
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/videos/by-uthema/:uthemaId', async (req, res) => {
    const uthemaId = req.params.uthemaId;
    try {
        const { data, error } = await supabase.from('video').select('*').eq('uthema_id', uthemaId);
        if (error) {
            throw error;
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/uthema/:themaId', async (req, res) => {
    const themaId = req.params.themaId;
    try {
        const { data, error } = await supabase.from('uthema').select('*').eq('thema_id', themaId);
        if (error) {
            throw error;
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Database query failed' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
