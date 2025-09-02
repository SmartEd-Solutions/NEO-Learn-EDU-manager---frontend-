@@ .. @@
+import { useAuthContext } from '@/components/AuthProvider';

 const Header = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
+  const { user } = useAuthContext();

   return (
     <header className="bg-card shadow-card border-b">
@@ .. @@
           {/* CTA Buttons */}
           <div className="hidden md:flex items-center space-x-4">
-            <Button variant="ghost" asChild>
-              <a href="/login">Login</a>
-            </Button>
-            <Button variant="default" className="bg-gradient-hero hover:shadow-glow transition-smooth" asChild>
-              <a href="/register">Get Started</a>
-            </Button>
+            {user ? (
+              <Button variant="default" className="bg-gradient-hero hover:shadow-glow transition-smooth" asChild>
+                <a href="/dashboard">Dashboard</a>
+              </Button>
+            ) : (
+              <>
+                <Button variant="ghost" asChild>
+                  <a href="/login">Login</a>
+                </Button>
+                <Button variant="default" className="bg-gradient-hero hover:shadow-glow transition-smooth" asChild>
+                  <a href="/register">Get Started</a>
+                </Button>
+              </>
+            )}
           </div>
@@ .. @@
               <div className="flex flex-col space-y-2 pt-4">
-                <Button variant="ghost" asChild className="justify-start">
-                  <a href="/login">Login</a>
-                </Button>
-                <Button variant="default" className="bg-gradient-hero justify-start" asChild>
-                  <a href="/register">Get Started</a>
-                </Button>
+                {user ? (
+                  <Button variant="default" className="bg-gradient-hero justify-start" asChild>
+                    <a href="/dashboard">Dashboard</a>
+                  </Button>
+                ) : (
+                  <>
+                    <Button variant="ghost" asChild className="justify-start">
+                      <a href="/login">Login</a>
+                    </Button>
+                    <Button variant="default" className="bg-gradient-hero justify-start" asChild>
+                      <a href="/register">Get Started</a>
+                    </Button>
+                  </>
+                )}
               </div>