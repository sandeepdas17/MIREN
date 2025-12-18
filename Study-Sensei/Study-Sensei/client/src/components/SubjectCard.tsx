import { useState } from 'react';
import { ChevronDown, Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import TopicItem from './TopicItem';
import type { Subject, ConfidenceLevel } from '@/lib/types';
import { cn } from '@/lib/utils';

interface SubjectCardProps {
  subject: Subject;
  onAddTopic: (subjectId: string, title: string) => void;
  onDeleteSubject: (subjectId: string) => void;
  onEditSubject: (subjectId: string, name: string) => void;
  onConfidenceChange: (topicId: string, confidence: ConfidenceLevel) => void;
  onDeleteTopic: (topicId: string) => void;
}

export default function SubjectCard({
  subject,
  onAddTopic,
  onDeleteSubject,
  onEditSubject,
  onConfidenceChange,
  onDeleteTopic,
}: SubjectCardProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(subject.name);
  const [isAddingTopic, setIsAddingTopic] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState('');

  const handleSaveEdit = () => {
    if (editName.trim()) {
      onEditSubject(subject.id, editName.trim());
      setIsEditing(false);
    }
  };

  const handleAddTopic = () => {
    if (newTopicTitle.trim()) {
      onAddTopic(subject.id, newTopicTitle.trim());
      setNewTopicTitle('');
      setIsAddingTopic(false);
    }
  };

  const confidenceCount = subject.topics.reduce(
    (acc, topic) => {
      acc[topic.confidence]++;
      return acc;
    },
    { confident: 0, somewhat: 0, 'not-confident': 0 }
  );

  return (
    <Card data-testid={`subject-card-${subject.id}`}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="p-4">
          <div className="flex items-center justify-between gap-4">
            <CollapsibleTrigger asChild>
              <button className="flex items-center gap-2 flex-1 min-w-0 text-left hover-elevate rounded-md p-1 -m-1">
                <ChevronDown className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform flex-shrink-0",
                  isOpen && "rotate-180"
                )} />
                {isEditing ? (
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveEdit();
                      if (e.key === 'Escape') {
                        setEditName(subject.name);
                        setIsEditing(false);
                      }
                    }}
                    className="h-8"
                    autoFocus
                    data-testid={`input-edit-subject-${subject.id}`}
                  />
                ) : (
                  <span className="text-lg font-semibold truncate">{subject.name}</span>
                )}
              </button>
            </CollapsibleTrigger>
            
            <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
              <div className="flex gap-1">
                {confidenceCount['not-confident'] > 0 && (
                  <Badge variant="outline" className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-800">
                    {confidenceCount['not-confident']}
                  </Badge>
                )}
                {confidenceCount.somewhat > 0 && (
                  <Badge variant="outline" className="text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800">
                    {confidenceCount.somewhat}
                  </Badge>
                )}
                {confidenceCount.confident > 0 && (
                  <Badge variant="outline" className="text-green-600 dark:text-green-400 border-green-200 dark:border-green-800">
                    {confidenceCount.confident}
                  </Badge>
                )}
              </div>
              
              {isEditing ? (
                <>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={handleSaveEdit}
                    data-testid={`button-save-subject-${subject.id}`}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => {
                      setEditName(subject.name);
                      setIsEditing(false);
                    }}
                    data-testid={`button-cancel-edit-${subject.id}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setIsEditing(true)}
                    aria-label="Edit subject"
                    data-testid={`button-edit-subject-${subject.id}`}
                  >
                    <Edit2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onDeleteSubject(subject.id)}
                    aria-label="Delete subject"
                    data-testid={`button-delete-subject-${subject.id}`}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent className="p-4 pt-0 space-y-3">
            {subject.topics.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No topics yet. Add your first topic below.
              </p>
            ) : (
              subject.topics.map((topic) => (
                <TopicItem
                  key={topic.id}
                  topic={topic}
                  subjectName={subject.name}
                  onConfidenceChange={onConfidenceChange}
                  onDelete={onDeleteTopic}
                />
              ))
            )}
            
            {isAddingTopic ? (
              <div className="flex gap-2">
                <Input
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                  placeholder="Topic name..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddTopic();
                    if (e.key === 'Escape') {
                      setNewTopicTitle('');
                      setIsAddingTopic(false);
                    }
                  }}
                  autoFocus
                  data-testid={`input-new-topic-${subject.id}`}
                />
                <Button onClick={handleAddTopic} data-testid={`button-save-topic-${subject.id}`}>
                  Add
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    setNewTopicTitle('');
                    setIsAddingTopic(false);
                  }}
                  data-testid={`button-cancel-topic-${subject.id}`}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsAddingTopic(true)}
                data-testid={`button-add-topic-${subject.id}`}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Topic
              </Button>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
