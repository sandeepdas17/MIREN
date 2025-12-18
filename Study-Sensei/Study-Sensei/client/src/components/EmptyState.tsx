import { BookOpen, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onAddSubject: () => void;
}

export default function EmptyState({ onAddSubject }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="p-4 rounded-full bg-primary/10 mb-4">
        <BookOpen className="h-10 w-10 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Welcome to M.I.R.E.N</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        Start by adding your first subject. Then add topics and track your confidence level for each one.
      </p>
      <Button onClick={onAddSubject} data-testid="button-add-first-subject">
        <Plus className="h-4 w-4 mr-2" />
        Add Your First Subject
      </Button>
    </div>
  );
}
