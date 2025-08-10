# TaglineGenius

TaglineGenius is an AI-powered web app that generates catchy, viral-worthy headlines for Valorant clips, designed to maximize views on TikTok, Reels, and Shorts.

## Features

- Enter a description of your Valorant clip.
- Get 5 scroll-stopping, meme-worthy taglines using Google Gemini AI.
- Modern, responsive UI with light/dark mode.

## Demo

![Demo screenshot or gif here, if available]

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A Google Gemini API key

### Installation

1. **Clone the repo:**
   ```sh
   git clone https://github.com/prateekraiger/taglinegenius.git
   cd taglinegenius
   ```
2. **Install dependencies:**
   ```sh
   pnpm install
   ```
3. **Set up your API key:**
   - Copy `.env.local` and add your Gemini API key:
     ```env
     GEMINI_API_KEY=your_real_api_key_here
     ```
4. **Run the app locally:**
   ```sh
   pnpm dev
   ```
5. **Open in browser:**
   - Visit [http://localhost:5173](http://localhost:5173)

## Usage

1. Enter a description of your Valorant clip in the input box.
2. Click the generate button to receive 5 viral taglines.
3. Copy and use your favorite tagline for your content!

## Project Structure

- `App.tsx` – Main React component
- `services/geminiService.ts` – Handles AI tagline generation
- `index.tsx` – App entry point
- `index.html` – HTML template
- `vite.config.ts` – Vite config for environment variables
- `.env.local` – API key (not committed)
- `.gitignore` – Ignores sensitive and build files

## Deployment

You can deploy this app to Vercel, Netlify, or any static hosting that supports Vite.

## License

MIT

---
