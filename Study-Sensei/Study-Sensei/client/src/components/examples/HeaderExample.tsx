import Header from '../Header';

export default function HeaderExample() {
  return <Header onAddSubject={() => console.log('Add subject clicked')} />;
}
