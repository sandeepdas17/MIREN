import { useState } from 'react';
import PriorityList from '../PriorityList';
import type { Subject, ConfidenceLevel } from '@/lib/types';

export default function PriorityListExample() {
  // todo: remove mock functionality
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: 's1',
      name: 'Mathematics',
      topics: [
        { id: 't1', subjectId: 's1', title: 'Quadratic Equations', confidence: 'not-confident' },
        { id: 't2', subjectId: 's1', title: 'Integration', confidence: 'somewhat' },
      ],
    },
    {
      id: 's2',
      name: 'Physics',
      topics: [
        { id: 't3', subjectId: 's2', title: 'Newton Laws', confidence: 'confident' },
        { id: 't4', subjectId: 's2', title: 'Thermodynamics', confidence: 'not-confident' },
      ],
    },
  ]);

  const handleConfidenceChange = (topicId: string, confidence: ConfidenceLevel) => {
    setSubjects(prev => prev.map(subject => ({
      ...subject,
      topics: subject.topics.map(t => t.id === topicId ? { ...t, confidence } : t),
    })));
  };

  return (
    <PriorityList
      subjects={subjects}
      onConfidenceChange={handleConfidenceChange}
      onDeleteTopic={(id) => console.log('Delete:', id)}
    />
  );
}
