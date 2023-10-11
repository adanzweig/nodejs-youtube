# YouTube Video Uploader

This project allows users to upload videos to YouTube using the YouTube Data API v3. It consists of two main parts:

1. **Index.js**: The core script responsible for uploading videos to YouTube once it has the necessary credentials.
2. **Server.js**: A simple Express server used to obtain the OAuth 2.0 refresh token which can then be used by `index.js` for uploading videos without requiring re-authentication.

## Prerequisites

1. Node.js installed on your machine.
2. A YouTube account.
3. A project set up on the [Google Developers Console](https://console.developers.google.com/) with the YouTube Data API v3 enabled and OAuth 2.0 credentials generated for a web application.

## Setup & Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/adanzweig/nodejs-youtube.git
   ```

2. Navigate to the project directory and install the required npm packages:
   ```bash
   cd nodejs-youtube
   npm install
   ```

3. Create a `.env` file in the root directory and populate it with your OAuth 2.0 credentials:
   ```env
   CLIENT_ID=YOUR_CLIENT_ID
   SECRET_ID=YOUR_CLIENT_SECRET
   REDIRECT_URL=YOUR_REDIRECT_URL
   # REFRESH_TOKEN will be populated later
   ```

4. Run the `server.js` file to start the Express server and obtain the refresh token:
   ```bash
   node server.js
   ```

5. Navigate to `http://localhost:3000/auth` in your browser to start the authentication process. Once authenticated, the refresh token will be displayed in the console. Copy and paste this token into the `.env` file as the value for `REFRESH_TOKEN`.

6. Now that you have the refresh token, you can use `index.js` to upload videos to YouTube:
   ```bash
   node index.js
   ```

## Usage

### server.js

This file's main purpose is to facilitate obtaining the refresh token. Once you have the refresh token, you don't need to run this file often unless you need a new token.

### index.js

Modify the parameters in the `uploadVideo` function call at the bottom of the file to fit your video's details. Then, run the script to upload the video to YouTube.

## Security

Always ensure that your `.env` file is included in your `.gitignore` to prevent unintentional sharing of sensitive credentials.
