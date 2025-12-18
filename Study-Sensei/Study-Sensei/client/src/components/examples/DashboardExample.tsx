import Dashboard from '../Dashboard';

export default function DashboardExample() {
  // todo: remove mock functionality
  const mockStats = {
    total: 12,
    confident: 4,
    somewhat: 5,
    notConfident: 3,
  };

  return <Dashboard stats={mockStats} />;
}
