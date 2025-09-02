import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuthContext } from '@/components/AuthProvider';
import { toast } from '@/components/ui/sonner';

const DemoDataSeeder = () => {
  const { userProfile } = useAuthContext();
  const [isSeeding, setIsSeeding] = useState(false);
  const [seededData, setSeededData] = useState<string[]>([]);

  const seedDemoData = async () => {
    if (userProfile?.role !== 'admin') {
      toast.error('Only administrators can seed demo data');
      return;
    }

    setIsSeeding(true);
    const seeded: string[] = [];

    try {
      // Seed demo classes
      const { data: classData, error: classError } = await supabase
        .from('classes')
        .upsert([
          { name: 'Grade 9A', grade_level: 9, academic_year: '2024-2025', max_students: 30 },
          { name: 'Grade 9B', grade_level: 9, academic_year: '2024-2025', max_students: 30 },
          { name: 'Grade 10A', grade_level: 10, academic_year: '2024-2025', max_students: 32 },
          { name: 'Grade 11A', grade_level: 11, academic_year: '2024-2025', max_students: 35 },
        ], { onConflict: 'name' })
        .select();

      if (!classError && classData) {
        seeded.push('Classes');
      }

      // Seed demo timetable for current user
      const { error: timetableError } = await supabase
        .from('timetable')
        .upsert([
          {
            user_id: userProfile.id,
            subject: 'Mathematics',
            day: 'Monday',
            start_time: '09:00',
            end_time: '09:45',
            location: 'Room 201'
          },
          {
            user_id: userProfile.id,
            subject: 'Physics',
            day: 'Monday',
            start_time: '10:30',
            end_time: '11:15',
            location: 'Lab 3'
          },
          {
            user_id: userProfile.id,
            subject: 'English',
            day: 'Tuesday',
            start_time: '08:15',
            end_time: '09:00',
            location: 'Room 105'
          },
        ], { onConflict: 'user_id,day,start_time' });

      if (!timetableError) {
        seeded.push('Timetable');
      }

      // Seed demo attendance for current user
      const today = new Date();
      const dates = Array.from({ length: 5 }, (_, i) => {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
      });

      const { error: attendanceError } = await supabase
        .from('attendance')
        .upsert(
          dates.map((date, i) => ({
            user_id: userProfile.id,
            date,
            status: i === 0 ? 'present' : i === 1 ? 'late' : 'present',
            remarks: i === 1 ? 'Arrived 10 minutes late' : '',
            recorded_by: userProfile.id,
          })),
          { onConflict: 'user_id,date' }
        );

      if (!attendanceError) {
        seeded.push('Attendance');
      }

      // Seed demo performance for current user
      const { error: performanceError } = await supabase
        .from('performance')
        .upsert([
          {
            user_id: userProfile.id,
            subject: 'Mathematics',
            grade: 'A',
            score: 92,
            max_score: 100,
            remarks: 'Excellent work on algebra concepts',
            recorded_by: userProfile.id,
          },
          {
            user_id: userProfile.id,
            subject: 'Physics',
            grade: 'B+',
            score: 87,
            max_score: 100,
            remarks: 'Good understanding of mechanics',
            recorded_by: userProfile.id,
          },
          {
            user_id: userProfile.id,
            subject: 'English',
            grade: 'A-',
            score: 89,
            max_score: 100,
            remarks: 'Strong essay writing skills',
            recorded_by: userProfile.id,
          },
        ], { onConflict: 'user_id,subject,recorded_at' });

      if (!performanceError) {
        seeded.push('Performance');
      }

      setSeededData(seeded);
      toast.success(`Demo data seeded successfully: ${seeded.join(', ')}`);
    } catch (error) {
      console.error('Error seeding demo data:', error);
      toast.error('Failed to seed demo data');
    } finally {
      setIsSeeding(false);
    }
  };

  if (userProfile?.role !== 'admin') {
    return null;
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Demo Data Seeder
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Populate the system with sample data for testing and demonstration purposes.
          </p>
          
          {seededData.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {seededData.map((item) => (
                <div key={item} className="flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  {item} seeded
                </div>
              ))}
            </div>
          )}

          <Button 
            onClick={seedDemoData} 
            disabled={isSeeding}
            className="bg-gradient-hero hover:shadow-glow"
          >
            {isSeeding ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Seeding Data...
              </>
            ) : (
              <>
                <Database className="h-4 w-4 mr-2" />
                Seed Demo Data
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemoDataSeeder;