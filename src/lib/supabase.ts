import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SUPABASE_URL = "https://bcxyrjdlqnofbqmyixds.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjeHlyamRscW5vZmJxbXlpeGRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDQxNzEsImV4cCI6MjA5NDM4MDE3MX0.aKIZp_ESvvc04sMUMvSnD0eom0lS_N8XeK7I6aUxU04";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
