@@ .. @@
   useEffect(() => {
     if (userId) {
       fetchPerformance();
     }
+  }, [userId]);
+
+  const fetchAllPerformance = async () => {
+    try {
+      setLoading(true);
+      let query = supabase
+        .from('performance')
+        .select('*');
+      
+      // If not admin, only fetch user's own performance
+      if (userId) {
+        query = query.eq('user_id', userId);
+      }
+      
+      const { data, error } = await query.order('recorded_at', { ascending: false });

+      if (error) {
+        console.error('Error fetching performance:', error);
+      } else {
+        setPerformance(data || []);
+      }
+    } catch (error) {
+      console.error('Error fetching performance:', error);
+    } finally {
+      setLoading(false);
+    }
   }, [userId]);