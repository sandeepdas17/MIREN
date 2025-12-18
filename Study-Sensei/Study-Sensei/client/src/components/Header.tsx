import { Plus, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onAddSubject: () => void;
}

export default function Header({ onAddSubject }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background border-b h-16 flex items-center px-4 md:px-6">
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">M.I.R.E.N</h1>
        </div>
        <Button onClick={onAddSubject} data-testid="button-add-subject">
          <Plus className="h-4 w-4 mr-2" />
          Add Subject
        </Button>
      </div>
    </header>
  );
}
