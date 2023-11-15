import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aucdcqopqqdxpsqomgfa.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1Y2RjcW9wcXFkeHBzcW9tZ2ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwNjk3OTQsImV4cCI6MjAxNTY0NTc5NH0.-D10byDhb12xkYOJEXWhXumsVdfd9gAlvmo-FQyFBJk';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;