import EmptyState from '../EmptyState';

export default function EmptyStateExample() {
  return <EmptyState onAddSubject={() => console.log('Add subject clicked')} />;
}
