
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Inject API Keys with fallback to empty string to prevent JSON.stringify(undefined)
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
      'process.env.ELEVENLABS_API_KEY': JSON.stringify(env.ELEVENLABS_API_KEY || ''),
      
      // Inject Supabase Configuration
      // We check for both VITE_ prefixed variables (standard Vite) and non-prefixed (standard .env)
      'process.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL || env.SUPABASE_URL || ''),
      'process.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY || env.SUPABASE_KEY || ''),
    }
  };
});
