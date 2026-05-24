import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SUPABASE_URL = "https://qluwvjfzkyicbxbwumgx.supabase.co";
const SUPABASE_ANON_KEY =
  "sb_publishable_mh6WzISPQb6X87Xfiz2j_g_q8CyEG65";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
