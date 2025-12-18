import { useState } from 'react';
import ConfidenceToggle from '../ConfidenceToggle';
import type { ConfidenceLevel } from '@/lib/types';

export default function ConfidenceToggleExample() {
  const [value, setValue] = useState<ConfidenceLevel>('somewhat');
  
  return (
    <div className="space-y-4 p-4">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Default:</p>
        <ConfidenceToggle value={value} onChange={setValue} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Compact:</p>
        <ConfidenceToggle value={value} onChange={setValue} compact />
      </div>
    </div>
  );
}
