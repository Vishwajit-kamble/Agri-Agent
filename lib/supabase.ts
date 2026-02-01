
import { createClient } from 'https://esm.sh/@supabase/supabase-js@^2.45.0';

// Explicitly defined credentials to prevent "supabaseUrl is required" errors at runtime.
const SUPABASE_URL = 'https://tdlqlpqvyanhjwjsymjl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkbHFscHF2eWFuaGp3anN5bWpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MTYxNDAsImV4cCI6MjA4NDQ5MjE0MH0.irfjgwSpzdks5diBr7SCusl79WfD3T5pA7pXEKX6CNw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
