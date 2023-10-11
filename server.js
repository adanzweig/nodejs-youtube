// Import required modules
const express = require('express');
const {google} = require('googleapis');
require('dotenv').config(); // Used to load environment variables from a .env file
const OAuth2 = google.auth.OAuth2;

// Create an Express application
const app = express();

// Set up OAuth2 client using environment variables
const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.SECRET_ID,
    process.env.REDIRECT_URL
);

// Endpoint to initiate OAuth2 process
app.get('/auth', (req, res) => {
    // Generate the Google OAuth2 URL
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline', // This ensures you receive a refresh token
        scope: ['https://www.googleapis.com/auth/youtube.upload'] // Define the permissions the app requires
    });
    // Redirect the user to Google's OAuth2 authorization page
    res.redirect(url);
});

// Endpoint to handle the callback after Google's OAuth2 process
app.get('/oauth2callback', async (req, res) => {
    // Extract the code from the query parameters
    const { code } = req.query;

    try {
        // Exchange the code for tokens
        const { tokens } = await oauth2Client.getToken(code);

        // Log and send the tokens (in a real-world scenario, you might want to store these securely and not expose them to the user)
        console.log(tokens);
        res.send(tokens);
    } catch (error) {
        // Handle errors during the OAuth2 process
        console.error('Error:', error);
        res.status(500).send('Error during oauth');
    }
});

// Start the Express server on port 3000
app.listen(3000, () => {
    console.log('Server started');
});
