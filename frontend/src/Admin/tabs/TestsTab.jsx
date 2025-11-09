import React from 'react';

export default function TestsTab({ analytics }) {
  const EXPECTED_CATEGORIES = [
    'Aptitude',
    'Technical',
    'Mechanical Engineering',
    'Civil Engineering',
    'Computer Engineering',
    'Electrical Engineering',
    'Electronics & Communication',
    'Chemical Engineering',
  ];

  const normalizedCategories = React.useMemo(() => {
    const byName = new Map((analytics.categories || []).map(c => [c.category, c]));
    const list = [];
    for (const name of EXPECTED_CATEGORIES) {
      if (byName.has(name)) list.push(byName.get(name));
      else list.push({ category: name, avg: 0, count: 0, avgTimeSpent: 0 });
    }
    for (const c of analytics.categories || []) {
      if (!EXPECTED_CATEGORIES.includes(c.category)) list.push(c);
    }
    return list;
  }, [analytics]);

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Test Categories Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(() => {
            const maxAvg = Math.max(1, ...normalizedCategories.map(c => c.avg || 0));
            return normalizedCategories.map((category) => (
              <div key={category.category} className="p-4 border border-slate-200 rounded-lg hover:border-green-300 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-slate-900">{category.category}</h4>
                  <span className="text-sm font-semibold text-green-600">{category.avg}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 mb-3">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" 
                       style={{ width: `${Math.min(100, (category.avg || 0) / maxAvg * 100)}%` }} />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{category.count} attempts</span>
                  {/* removed minute display in category performance */}
                </div>
              </div>
            ));
          })()}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Daily Test Activity</h3>
          <div className="h-48 flex items-end space-x-1">
            {analytics.dailyCounts.map((count, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-green-500 to-emerald-400 rounded-t" 
                   style={{ height: `${Math.max(8, (count / Math.max(...analytics.dailyCounts)) * 100)}%` }} />
            ))}
          </div>
          <div className="mt-4 text-sm text-slate-500">
            Total: {analytics.dailyCounts.reduce((a, b) => a + b, 0)} tests in 14 days
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Average Score Trend</h3>
          <div className="h-48 flex items-end space-x-1">
            {(() => {
              const maxScore = Math.max(1, ...(analytics.dailyAvgScores || [1]));
              return (analytics.dailyAvgScores || []).map((score, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-amber-500 to-yellow-400 rounded-t" 
                     style={{ height: `${Math.max(8, (score / maxScore) * 100)}%` }} />
              ));
            })()}
          </div>
          <div className="mt-4 text-sm text-slate-500">
            Average: {analytics.avgScore} across all tests
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Recent Test Activity</h3>
        <div className="space-y-3">
          {analytics.recent.map((test, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {test.userName.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-slate-900">{test.userName}</p>
                  <p className="text-sm text-slate-500">{test.category} • {test.department}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-green-600">{test.score}</p>
                <p className="text-sm text-slate-500">{new Date(test.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
