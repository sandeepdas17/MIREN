import { AlertCircle, HelpCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TopicItem from './TopicItem';
import type { Subject, Topic, ConfidenceLevel } from '@/lib/types';

interface PriorityListProps {
  subjects: Subject[];
  onConfidenceChange: (topicId: string, confidence: ConfidenceLevel) => void;
  onDeleteTopic: (topicId: string) => void;
}

interface GroupedTopic extends Topic {
  subjectName: string;
}

export default function PriorityList({ subjects, onConfidenceChange, onDeleteTopic }: PriorityListProps) {
  const allTopics: GroupedTopic[] = subjects.flatMap(subject =>
    subject.topics.map(topic => ({ ...topic, subjectName: subject.name }))
  );

  const notConfidentTopics = allTopics.filter(t => t.confidence === 'not-confident');
  const somewhatTopics = allTopics.filter(t => t.confidence === 'somewhat');
  const confidentTopics = allTopics.filter(t => t.confidence === 'confident');

  if (allTopics.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">
            Add subjects and topics to see your revision priority list.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Revision Priority</h2>
        <p className="text-muted-foreground text-sm">Topics sorted by confidence level - focus on red items first</p>
      </div>

      {notConfidentTopics.length > 0 && (
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span className="text-red-600 dark:text-red-400">Need Attention</span>
              <span className="text-muted-foreground font-normal">({notConfidentTopics.length} topics)</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">Focus on these topics first</p>
          </CardHeader>
          <CardContent className="space-y-2">
            {notConfidentTopics.map(topic => (
              <TopicItem
                key={topic.id}
                topic={topic}
                subjectName={topic.subjectName}
                onConfidenceChange={onConfidenceChange}
                onDelete={onDeleteTopic}
                showSubject
              />
            ))}
          </CardContent>
        </Card>
      )}

      {somewhatTopics.length > 0 && (
        <Card className="border-yellow-200 dark:border-yellow-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <HelpCircle className="h-5 w-5 text-yellow-500" />
              <span className="text-yellow-600 dark:text-yellow-400">Getting There</span>
              <span className="text-muted-foreground font-normal">({somewhatTopics.length} topics)</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">Review these to solidify your understanding</p>
          </CardHeader>
          <CardContent className="space-y-2">
            {somewhatTopics.map(topic => (
              <TopicItem
                key={topic.id}
                topic={topic}
                subjectName={topic.subjectName}
                onConfidenceChange={onConfidenceChange}
                onDelete={onDeleteTopic}
                showSubject
              />
            ))}
          </CardContent>
        </Card>
      )}

      {confidentTopics.length > 0 && (
        <Card className="border-green-200 dark:border-green-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-green-600 dark:text-green-400">Ready</span>
              <span className="text-muted-foreground font-normal">({confidentTopics.length} topics)</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">Great job! Keep these fresh with occasional review</p>
          </CardHeader>
          <CardContent className="space-y-2">
            {confidentTopics.map(topic => (
              <TopicItem
                key={topic.id}
                topic={topic}
                subjectName={topic.subjectName}
                onConfidenceChange={onConfidenceChange}
                onDelete={onDeleteTopic}
                showSubject
              />
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
