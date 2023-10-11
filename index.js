// Import necessary modules
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const fs = require('fs');
require('dotenv').config(); // This allows us to use environment variables from a .env file

/**
 * Uploads a video to YouTube.
 *
 * @param {string} title - The title of the video.
 * @param {string} description - The description of the video.
 * @param {string} videoInput - The path to the video file to be uploaded.
 */
async function uploadVideo(title, description, videoInput) {
    // Set up OAuth2 client using environment variables
    const oauth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.SECRET_ID,
        process.env.REDIRECT_URL
    );
    // Set the client's credentials using the refresh token from environment variables
    oauth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN});

    // Instantiate a YouTube object which allows us to interact with the YouTube API
    const youtube = google.youtube({
        version: 'v3',
        auth: oauth2Client
    });

    // Use the `videos.insert` method to upload a video
    youtube.videos.insert({
        resource: {
            snippet: {
                title,       // Video title
                description  // Video description
            },
            status: {
                privacyStatus: 'private' // Setting the video to private
            },
        },
        part: 'snippet,status', // Define the parts of the video object we are setting/updating
        media: {
            body: fs.createReadStream(videoInput) // Read the video file
        }
    }, (err, data) => {
        // Handle the callback after attempting the upload
        if (err) {
            console.error('error', err); // Log the error if there's one
        } else {
            console.log('Uploaded video: ', data.data.id); // Log the ID of the uploaded video
        }
    });
}

// Immediately invoked function expression (IIFE) to run the uploadVideo function
(async () => {
    await uploadVideo('@codingWithAdo test', 'Testing upload', 'test.mp4');
})();
