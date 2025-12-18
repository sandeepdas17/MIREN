import { Card, CardContent } from '@/components/ui/card';
import { Target, AlertCircle, HelpCircle, CheckCircle } from 'lucide-react';
import type { Stats } from '@/lib/types';

interface DashboardProps {
  stats: Stats;
}

export default function Dashboard({ stats }: DashboardProps) {
  const { total, confident, somewhat, notConfident } = stats;
  
  const getPercentage = (value: number) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Revision Snapshot</h2>
        <p className="text-muted-foreground text-sm">Track your confidence across all topics</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card data-testid="card-total-topics">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-primary/10">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{total}</p>
                <p className="text-sm text-muted-foreground">Total Topics</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-not-confident">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-red-100 dark:bg-red-900/30">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{notConfident}</p>
                <p className="text-sm text-muted-foreground">Not Confident</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-somewhat-confident">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-yellow-100 dark:bg-yellow-900/30">
                <HelpCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{somewhat}</p>
                <p className="text-sm text-muted-foreground">Somewhat Confident</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-confident">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-green-100 dark:bg-green-900/30">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{confident}</p>
                <p className="text-sm text-muted-foreground">Confident</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {total > 0 && (
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium mb-3">Confidence Distribution</p>
            <div className="flex h-3 rounded-full overflow-hidden bg-muted">
              {notConfident > 0 && (
                <div 
                  className="bg-red-500 dark:bg-red-400 transition-all" 
                  style={{ width: `${getPercentage(notConfident)}%` }}
                  data-testid="bar-not-confident"
                />
              )}
              {somewhat > 0 && (
                <div 
                  className="bg-yellow-500 dark:bg-yellow-400 transition-all" 
                  style={{ width: `${getPercentage(somewhat)}%` }}
                  data-testid="bar-somewhat"
                />
              )}
              {confident > 0 && (
                <div 
                  className="bg-green-500 dark:bg-green-400 transition-all" 
                  style={{ width: `${getPercentage(confident)}%` }}
                  data-testid="bar-confident"
                />
              )}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>{getPercentage(notConfident)}% Need Revision</span>
              <span>{getPercentage(somewhat)}% Getting There</span>
              <span>{getPercentage(confident)}% Ready</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
