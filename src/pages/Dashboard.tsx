import { useSettings } from '@/hooks/useSettings';
import { ThemeOption } from '@/lib/supabase';
import { toast } from '@/components/ui/sonner';
import LoadingState from '@/components/LoadingState';
import DemoDataSeeder from '@/components/DemoDataSeeder';

const Dashboard = () => {
  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Error signing out');
    } else {
      toast.success('Signed out successfully');
      setTimeout(() => {

            {/* Demo Data Seeder for Admins */}
            <DemoDataSeeder />
        window.location.href = '/';
      }, 500);
    }
  };
 // Show loading state while user profile is being fetched
 if (!userProfile) {
   return (
     <div className="min-h-screen bg-background flex items-center justify-center">
       <Card className="w-96">
         <CardContent className="flex items-center justify-center p-8">
           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mr-3"></div>
           <span className="text-muted-foreground">Loading dashboard...</span>
         </CardContent>
       </Card>
     </div>
   );
 }

 // Get real stats
     default:
       return (
         <div className="space-y-6 animate-fade-in">
           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
             <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>
             <div className="text-muted-foreground text-sm">
               Welcome back, <span className="font-medium text-foreground">{userProfile?.full_name}</span>
             </div>
           </div>

           {/* Stats Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
             {getOverviewStats().map((stat, index) => (
               <Card key={index} className="shadow-card hover-lift animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                 <CardContent className="p-6">
                   <div className="flex items-center justify-between">
                     <div>
                       <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
                       <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                     </div>
                     <div className={`text-sm ${
                       stat.changeType === 'positive' ? 'text-primary' : 
                       stat.changeType === 'negative' ? 'text-destructive' : 'text-muted-foreground'
                     }`}>
                       {stat.change}
                     </div>
                   </div>
                 </CardContent>
               </Card>
             ))}
           </div>