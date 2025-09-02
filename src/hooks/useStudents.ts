@@ .. @@
   const addStudent = async (studentData: {
     full_name: string;
     email: string;
     student_id: string;
     class_id?: string;
     parent_name: string;
     parent_email?: string;
     parent_phone?: string;
     enrollment_date: string;
   }) => {
     try {
-      // First create the user account
-      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
-        email: studentData.email,
-        password: 'temp123456', // Temporary password
-        email_confirm: true,
-        user_metadata: {
-          full_name: studentData.full_name,
-          role: 'student'
-        }
-      });
-
-      if (authError) {
-        console.error('Error creating user:', authError);
-        return { data: null, error: authError };
-      }
-
-      // Then create the student record
+      // Create user account with signup
+      const { data: authData, error: authError } = await supabase.auth.signUp({
+        email: studentData.email,
+        password: 'Student123!', // Default password - should be changed on first login
+        options: {
+          data: {
+            full_name: studentData.full_name,
+            role: 'student'
+          }
+        }
+      });
+
+      if (authError || !authData.user) {
+        console.error('Error creating user:', authError);
+        return { data: null, error: authError || new Error('Failed to create user') };
+      }
+
+      // Create the student record
       const { data, error } = await supabase
         .from('students')
         .insert([{
           user_id: authData.user.id,
           student_id: studentData.student_id,
           class_id: studentData.class_id,
           parent_name: studentData.parent_name,
           parent_email: studentData.parent_email,
           parent_phone: studentData.parent_phone,
           enrollment_date: studentData.enrollment_date,
         }])
         .select(`
           *,
           user:users(*),
           class:classes(*)
         `)
         .single();

       if (error) {
         console.error('Error creating student:', error);
         return { data: null, error };
       }

       setStudents(prev => [data, ...prev]);
       return { data, error: null };
     } catch (error) {
       console.error('Error creating student:', error);
       return { data: null, error };
     }
   };