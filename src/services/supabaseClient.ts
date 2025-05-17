
import { createClient } from '@supabase/supabase-js';

// Instead of relying on environment variables that might not be available,
// we'll set default values for local development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Log for debugging purposes
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey.substring(0, 5) + '...');

// Create the Supabase client with error handling
let supabase;

try {
  // Check if we have valid URL (not the placeholder)
  if (supabaseUrl === 'https://your-project-url.supabase.co') {
    console.warn('Using placeholder Supabase URL. Replace with your actual Supabase URL for database functionality.');
  }
  
  // Create client - will throw error if URL is invalid
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  // Test connection
  supabase.auth.getSession().then(({ data, error }) => {
    if (error) {
      console.error('Supabase connection error:', error);
    } else {
      console.log('Supabase client initialized successfully');
    }
  });
} catch (error) {
  console.error('Error initializing Supabase client:', error);
  // Create a mock client that won't crash the app
  supabase = {
    from: () => ({
      select: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      insert: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      update: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      delete: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    }),
    auth: {
      getSession: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    },
    storage: () => ({
      upload: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    }),
  };
}

export { supabase };
export default supabase;
