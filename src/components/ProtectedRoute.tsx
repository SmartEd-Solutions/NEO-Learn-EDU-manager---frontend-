@@ .. @@
   if (!user) {
-    window.location.href = '/login';
+    // Use React Router navigation instead of window.location
+    React.useEffect(() => {
+      const timer = setTimeout(() => {
+        window.location.href = '/login';
+      }, 100);
+      return () => clearTimeout(timer);
+    }, []);
     return null;
   }