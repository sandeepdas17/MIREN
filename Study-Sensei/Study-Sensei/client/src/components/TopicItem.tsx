import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConfidenceToggle from './ConfidenceToggle';
import type { Topic, ConfidenceLevel } from '@/lib/types';

interface TopicItemProps {
  topic: Topic;
  subjectName: string;
  onConfidenceChange: (topicId: string, confidence: ConfidenceLevel) => void;
  onDelete: (topicId: string) => void;
  showSubject?: boolean;
}

export default function TopicItem({ 
  topic, 
  subjectName, 
  onConfidenceChange, 
  onDelete, 
  showSubject = false 
}: TopicItemProps) {
  return (
    <div 
      className="flex items-center justify-between gap-4 p-3 rounded-md bg-card border"
      data-testid={`topic-item-${topic.id}`}
    >
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{topic.title}</p>
        {showSubject && (
          <p className="text-xs text-muted-foreground">{subjectName}</p>
        )}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
        <ConfidenceToggle 
          value={topic.confidence} 
          onChange={(value) => onConfidenceChange(topic.id, value)}
          compact
        />
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onDelete(topic.id)}
          aria-label="Delete topic"
          data-testid={`button-delete-topic-${topic.id}`}
        >
          <Trash2 className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
    </div>
  );
}
