@@ .. @@
   useEffect(() => {
     if (userId) {
       fetchAttendance();
     }
+  }, [userId]);
+
+  const fetchAllAttendance = async () => {
+    try {
+      setLoading(true);
+      let query = supabase
+        .from('attendance')
+        .select('*');
+      
+      // If not admin, only fetch user's own attendance
+      if (userId) {
+        query = query.eq('user_id', userId);
+      }
+      
+      const { data, error } = await query.order('date', { ascending: false });
+
+      if (error) {
+        console.error('Error fetching attendance:', error);
+      } else {
+        setAttendance(data || []);
+      }
+    } catch (error) {
+      console.error('Error fetching attendance:', error);
+    } finally {
+      setLoading(false);
+    }
   }, [userId]);