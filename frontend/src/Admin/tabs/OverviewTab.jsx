import React from 'react';

export default function OverviewTab({ stats, analytics }) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between overflow-x-auto">
          <div className="flex items-center space-x-4 md:space-x-8 min-w-max">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-slate-900">{stats.students}</div>
              <div className="text-xs md:text-sm text-slate-600">Total Students</div>
              <div className="text-xs text-slate-500">Active learners</div>
            </div>
            <div className="w-px h-8 md:h-12 bg-slate-200"></div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-green-600">{analytics.totalTests}</div>
              <div className="text-xs md:text-sm text-slate-600">Tests Taken</div>
              <div className="text-xs text-slate-500">Total attempts</div>
            </div>
            <div className="w-px h-8 md:h-12 bg-slate-200"></div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-emerald-600">{analytics.avgScore}</div>
              <div className="text-xs md:text-sm text-slate-600">Average Score</div>
              <div className="text-xs text-slate-500">Across all tests</div>
            </div>
            <div className="w-px h-8 md:h-12 bg-slate-200"></div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-amber-600">{stats.activeUsers}</div>
              <div className="text-xs md:text-sm text-slate-600">Active Users</div>
              <div className="text-xs text-slate-500">Last 7 days</div>
            </div>
            <div className="w-px h-8 md:h-12 bg-slate-200"></div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-purple-600">{analytics.categories.length}</div>
              <div className="text-xs md:text-sm text-slate-600">Categories</div>
              <div className="text-xs text-slate-500">Test types</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Activity Trend</h3>
            <span className="text-sm text-slate-500">14 days</span>
          </div>
          <div className="h-32 flex items-end space-x-1">
            {analytics.dailyCounts.map((count, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-green-500 to-emerald-400 rounded-t" 
                   style={{ height: `${Math.max(8, (count / Math.max(...analytics.dailyCounts)) * 100)}%` }} />
            ))}
          </div>
          <div className="mt-4 text-xs text-slate-500">
            Total: {analytics.dailyCounts.reduce((a, b) => a + b, 0)} tests
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Score Trend</h3>
            <span className="text-sm text-slate-500">14 days</span>
          </div>
          <div className="h-32 flex items-end space-x-1">
            {(() => {
              const maxScore = Math.max(1, ...(analytics.dailyAvgScores || [1]));
              return (analytics.dailyAvgScores || []).map((score, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-amber-500 to-yellow-400 rounded-t" 
                     style={{ height: `${Math.max(8, (score / maxScore) * 100)}%` }} />
              ));
            })()}
          </div>
          <div className="mt-4 text-xs text-slate-500">
            Average: {analytics.avgScore}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Category Performance</h3>
          <span className="text-sm text-slate-500">{analytics.categories.length} categories</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(() => {
            const subset = (analytics.categories || []).slice(0, 6);
            const maxAvg = Math.max(1, ...subset.map(c => c.avg || 0));
            return subset.map((category) => (
              <div key={category.category} className="p-4 rounded-xl border border-slate-200 hover:border-green-300 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-slate-900">{category.category}</h4>
                  <span className="text-sm font-semibold text-green-600">{category.avg}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
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

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
          <span className="text-sm text-slate-500">Last 10 tests</span>
        </div>
        <div className="space-y-3">
          {analytics.recent.map((activity, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{activity.userName}</p>
                  <p className="text-xs text-slate-500">{activity.category} • {new Date(activity.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-green-600">{activity.score}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
