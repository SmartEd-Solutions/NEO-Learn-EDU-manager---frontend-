@@ .. @@
 import { useAuthContext } from '@/components/AuthProvider';
 import { useAssistant } from '@/hooks/useAssistant';
 import { openaiService } from '@/lib/openai';

 const AIQueryBox = () => {
   const { userProfile } = useAuthContext();
-  const { askQuestion } = useAssistant(userProfile?.id);
+  const { askQuestion, loading: assistantLoading } = useAssistant(userProfile?.id);
   const [query, setQuery] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [response, setResponse] = useState('');

   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     if (!query.trim()) return;

     setIsLoading(true);
     
     try {
-      // Try OpenAI first, fallback to mock response
       let aiResponse: string;
       
       if (openaiService.isConfigured()) {
         aiResponse = await openaiService.generateResponse(query, {
           user_role: userProfile?.role,
           user_name: userProfile?.full_name,
         });
       } else {
         const { response: mockResponse, error } = await askQuestion(query);
         if (error) {
           setResponse('Sorry, I encountered an error processing your question. Please try again.');
           return;
         }
         aiResponse = mockResponse;
       }
       
       setResponse(aiResponse);
-      
-      // Save interaction to database
-      await askQuestion(query);
     } catch (error) {
       setResponse('Sorry, I encountered an error processing your question. Please try again.');
     } finally {
       setIsLoading(false);
       setQuery('');
     }
   };

+  // Show login prompt if user is not authenticated
+  if (!userProfile) {
+    return (
+      <Card className="shadow-card">
+        <CardContent className="p-8 text-center">
+          <Brain className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
+          <h3 className="text-lg font-semibold mb-2">AI Assistant</h3>
+          <p className="text-muted-foreground mb-4">
+            Sign in to access our AI-powered school management assistant
+          </p>
+          <div className="flex gap-2 justify-center">
+            <Button variant="outline" asChild>
+              <a href="/login">Login</a>
+            </Button>
+            <Button className="bg-gradient-hero" asChild>
+              <a href="/register">Sign Up</a>
+            </Button>
+          </div>
+        </CardContent>
+      </Card>
+    );
+  }

   return (