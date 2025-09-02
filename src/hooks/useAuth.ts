@@ .. @@
   const signUp = async (email: string, password: string, fullName: string, role: string) => {
-    const redirectUrl = `${window.location.origin}/`;
     const { data, error } = await supabase.auth.signUp({
       email,
       password,
       options: {
-        emailRedirectTo: redirectUrl,
+        emailRedirectTo: `${window.location.origin}/dashboard`,
         data: {
           full_name: fullName,
           role: role,
         },
       },
     });
+    
+    // If signup is successful and user is immediately confirmed, fetch profile
+    if (data.user && !error) {
+      await fetchUserProfile(data.user.id);
+    }
+    
     return { data, error };
   };