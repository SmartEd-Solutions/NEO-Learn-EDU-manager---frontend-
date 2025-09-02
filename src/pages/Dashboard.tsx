@@ .. @@
   const handleSignOut = async () => {
     const { error } = await signOut();
     if (error) {
       toast.error('Error signing out');
     } else {
-      window.location.href = '/';
+      toast.success('Signed out successfully');
+      setTimeout(() => {
+        window.location.href = '/';
+      }, 500);
     }
   };

export default handleSignOut