import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import SubjectCard from '@/components/SubjectCard';
import PriorityList from '@/components/PriorityList';
import AddSubjectDialog from '@/components/AddSubjectDialog';
import EmptyState from '@/components/EmptyState';
import { useToast } from '@/hooks/use-toast';
import { queryClient, apiRequest } from '@/lib/queryClient';
import type { Subject, ConfidenceLevel, Stats } from '@/lib/types';
import { LayoutDashboard, ListOrdered, BookOpen } from 'lucide-react';

export default function Home() {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const { toast } = useToast();

  // Fetch subjects with topics
  const { data: subjects = [], isLoading } = useQuery<Subject[]>({
    queryKey: ['/api/subjects'],
    queryFn: async () => {
      const res = await fetch('/api/subjects');
      if (!res.ok) throw new Error('Failed to fetch subjects');
      return res.json();
    },
  });

  // Calculate stats
  const stats: Stats = {
    total: subjects.reduce((sum, s) => sum + s.topics.length, 0),
    confident: subjects.reduce((sum, s) => sum + s.topics.filter(t => t.confidence === 'confident').length, 0),
    somewhat: subjects.reduce((sum, s) => sum + s.topics.filter(t => t.confidence === 'somewhat').length, 0),
    notConfident: subjects.reduce((sum, s) => sum + s.topics.filter(t => t.confidence === 'not-confident').length, 0),
  };

  // Add subject mutation
  const addSubjectMutation = useMutation({
    mutationFn: async (name: string) => {
      return apiRequest('POST', '/api/subjects', { name });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/subjects'] });
      toast({ title: 'Subject added', description: 'Your new subject is ready.' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to add subject.', variant: 'destructive' });
    },
  });

  // Update subject mutation
  const updateSubjectMutation = useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      return apiRequest('PATCH', `/api/subjects/${id}`, { name });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/subjects'] });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to update subject.', variant: 'destructive' });
    },
  });

  // Delete subject mutation
  const deleteSubjectMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('DELETE', `/api/subjects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/subjects'] });
      toast({ title: 'Subject deleted', description: 'Subject and all its topics have been removed.' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to delete subject.', variant: 'destructive' });
    },
  });

  // Add topic mutation
  const addTopicMutation = useMutation({
    mutationFn: async ({ subjectId, title }: { subjectId: string; title: string }) => {
      return apiRequest('POST', '/api/topics', { subjectId, title, confidence: 'not-confident' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/subjects'] });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to add topic.', variant: 'destructive' });
    },
  });

  // Update topic confidence mutation
  const updateTopicMutation = useMutation({
    mutationFn: async ({ id, confidence }: { id: string; confidence: ConfidenceLevel }) => {
      return apiRequest('PATCH', `/api/topics/${id}`, { confidence });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/subjects'] });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to update topic.', variant: 'destructive' });
    },
  });

  // Delete topic mutation
  const deleteTopicMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('DELETE', `/api/topics/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/subjects'] });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to delete topic.', variant: 'destructive' });
    },
  });

  const handleAddSubject = (name: string) => {
    addSubjectMutation.mutate(name);
    setAddDialogOpen(false);
  };

  const handleDeleteSubject = (id: string) => {
    if (confirm('Are you sure you want to delete this subject and all its topics?')) {
      deleteSubjectMutation.mutate(id);
    }
  };

  const handleEditSubject = (id: string, name: string) => {
    updateSubjectMutation.mutate({ id, name });
  };

  const handleAddTopic = (subjectId: string, title: string) => {
    addTopicMutation.mutate({ subjectId, title });
  };

  const handleConfidenceChange = (topicId: string, confidence: ConfidenceLevel) => {
    updateTopicMutation.mutate({ id: topicId, confidence });
  };

  const handleDeleteTopic = (id: string) => {
    deleteTopicMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onAddSubject={() => setAddDialogOpen(true)} />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {subjects.length === 0 ? (
          <EmptyState onAddSubject={() => setAddDialogOpen(true)} />
        ) : (
          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="dashboard" data-testid="tab-dashboard">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="subjects" data-testid="tab-subjects">
                <BookOpen className="h-4 w-4 mr-2" />
                Subjects
              </TabsTrigger>
              <TabsTrigger value="priority" data-testid="tab-priority">
                <ListOrdered className="h-4 w-4 mr-2" />
                Priority
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <Dashboard stats={stats} />
            </TabsContent>

            <TabsContent value="subjects" className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">Your Subjects</h2>
                <p className="text-muted-foreground text-sm">Manage your subjects and topics</p>
              </div>
              {subjects.map(subject => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  onAddTopic={handleAddTopic}
                  onDeleteSubject={handleDeleteSubject}
                  onEditSubject={handleEditSubject}
                  onConfidenceChange={handleConfidenceChange}
                  onDeleteTopic={handleDeleteTopic}
                />
              ))}
            </TabsContent>

            <TabsContent value="priority">
              <PriorityList
                subjects={subjects}
                onConfidenceChange={handleConfidenceChange}
                onDeleteTopic={handleDeleteTopic}
              />
            </TabsContent>
          </Tabs>
        )}
      </main>

      <AddSubjectDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onAdd={handleAddSubject}
      />
    </div>
  );
}
