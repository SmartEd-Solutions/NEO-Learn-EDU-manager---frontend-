@@ .. @@
 import { createClient } from '@supabase/supabase-js';

-const supabaseUrl = 'https://mswupuykzpooozfbitmx.supabase.co';
-const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zd3VwdXlrenBvb296ZmJpdG14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2Mjg0MzEsImV4cCI6MjA3MjIwNDQzMX0.uQ_CcDv9o1DcjDyoL2bybkDHs4LE9AqmpE4vXawm-Kg';
+const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
+const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

-export const supabase = createClient(supabaseUrl, supabaseAnonKey);
+export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
+  auth: {
+    autoRefreshToken: true,
+    persistSession: true,
+    detectSessionInUrl: true
+  }
+});