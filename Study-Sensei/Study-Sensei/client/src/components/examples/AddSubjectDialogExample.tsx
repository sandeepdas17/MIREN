import { useState } from 'react';
import AddSubjectDialog from '../AddSubjectDialog';
import { Button } from '@/components/ui/button';

export default function AddSubjectDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <AddSubjectDialog
        open={open}
        onOpenChange={setOpen}
        onAdd={(name) => console.log('Added subject:', name)}
      />
    </div>
  );
}
