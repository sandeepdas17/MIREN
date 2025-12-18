import { useState } from 'react';
import TopicItem from '../TopicItem';
import type { Topic, ConfidenceLevel } from '@/lib/types';

export default function TopicItemExample() {
  // todo: remove mock functionality
  const [topic, setTopic] = useState<Topic>({
    id: '1',
    subjectId: 's1',
    title: 'Quadratic Equations',
    confidence: 'somewhat',
  });

  const handleConfidenceChange = (_topicId: string, confidence: ConfidenceLevel) => {
    setTopic(prev => ({ ...prev, confidence }));
  };

  return (
    <div className="space-y-4 p-4">
      <TopicItem
        topic={topic}
        subjectName="Mathematics"
        onConfidenceChange={handleConfidenceChange}
        onDelete={(id) => console.log('Delete topic:', id)}
      />
      <TopicItem
        topic={topic}
        subjectName="Mathematics"
        onConfidenceChange={handleConfidenceChange}
        onDelete={(id) => console.log('Delete topic:', id)}
        showSubject
      />
    </div>
  );
}
