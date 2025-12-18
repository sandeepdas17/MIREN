import { useState } from 'react';
import SubjectCard from '../SubjectCard';
import type { Subject, ConfidenceLevel } from '@/lib/types';

export default function SubjectCardExample() {
  // todo: remove mock functionality
  const [subject, setSubject] = useState<Subject>({
    id: 's1',
    name: 'Mathematics',
    topics: [
      { id: 't1', subjectId: 's1', title: 'Quadratic Equations', confidence: 'not-confident' },
      { id: 't2', subjectId: 's1', title: 'Integration', confidence: 'somewhat' },
      { id: 't3', subjectId: 's1', title: 'Differentiation', confidence: 'confident' },
    ],
  });

  const handleAddTopic = (subjectId: string, title: string) => {
    const newTopic = {
      id: `t${Date.now()}`,
      subjectId,
      title,
      confidence: 'not-confident' as ConfidenceLevel,
    };
    setSubject(prev => ({ ...prev, topics: [...prev.topics, newTopic] }));
  };

  const handleConfidenceChange = (topicId: string, confidence: ConfidenceLevel) => {
    setSubject(prev => ({
      ...prev,
      topics: prev.topics.map(t => t.id === topicId ? { ...t, confidence } : t),
    }));
  };

  const handleDeleteTopic = (topicId: string) => {
    setSubject(prev => ({
      ...prev,
      topics: prev.topics.filter(t => t.id !== topicId),
    }));
  };

  return (
    <SubjectCard
      subject={subject}
      onAddTopic={handleAddTopic}
      onDeleteSubject={(id) => console.log('Delete subject:', id)}
      onEditSubject={(id, name) => setSubject(prev => ({ ...prev, name }))}
      onConfidenceChange={handleConfidenceChange}
      onDeleteTopic={handleDeleteTopic}
    />
  );
}
