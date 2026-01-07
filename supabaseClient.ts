import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your_supabase_project_url') {
  console.warn('Supabase URL or Key is missing or invalid. Using placeholder for now.');
}

// Ensure we pass a valid URL structure even if it's a placeholder, to prevent crash
const validUrl = (supabaseUrl && supabaseUrl.startsWith('http')) ? supabaseUrl : 'https://placeholder.supabase.co';

export const supabase = createClient(
  validUrl, 
  supabaseAnonKey || 'placeholder'
);
