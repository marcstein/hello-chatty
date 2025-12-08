# Hello, Chatty 3.0

An assistive communication interface optimized for eye-tracking devices, featuring dwell interaction, predictive text via Gemini API, and voice banking.

## Features
- **Dwell Interaction**: Optimized for eye-trackers.
- **AI Predictions**: Context-aware suggestions using Google Gemini.
- **Voice Banking**: Integration with ElevenLabs for voice cloning.
- **Service Requests**: One-touch requests for care needs.
- **Multilingual**: Supports English, Spanish, French, and Japanese.

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   API_KEY=your_google_gemini_api_key
   ELEVENLABS_API_KEY=your_elevenlabs_api_key
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_public_key
   ```

3. **Run Locally**
   ```bash
   npm run dev
   ```

## Deployment (Vercel)

1. **Push to GitHub**: Commit your code and push it to a new GitHub repository.
2. **New Project**: Go to Vercel, click "Add New...", and select "Project". Import your GitHub repository.
3. **Configure**: 
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Environment Variables**: In the "Environment Variables" section, add the following (copy values from your `.env` or API dashboards):
   - `API_KEY`
   - `ELEVENLABS_API_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. **Deploy**: Click "Deploy".
