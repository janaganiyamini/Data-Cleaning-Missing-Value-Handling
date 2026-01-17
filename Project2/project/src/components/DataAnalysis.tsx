import { DataStats } from '../utils/dataProcessor';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface DataAnalysisProps {
  stats: DataStats;
  data: string[][];
  onNext: () => void;
}

export default function DataAnalysis({ stats, data, onNext }: DataAnalysisProps) {
  const columnsWithMissing = Object.entries(stats.missingValues).filter(([_, count]) => count > 0);
  const totalMissing = Object.values(stats.missingValues).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dataset Analysis</h2>
        <p className="text-gray-600">Review missing values and data quality</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-700 mb-1">Total Rows</p>
          <p className="text-3xl font-bold text-blue-900">{stats.totalRows}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <p className="text-sm text-green-700 mb-1">Total Columns</p>
          <p className="text-3xl font-bold text-green-900">{stats.totalColumns}</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
          <p className="text-sm text-orange-700 mb-1">Missing Values</p>
          <p className="text-3xl font-bold text-orange-900">{totalMissing}</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-orange-500" />
          Missing Values by Column
        </h3>

        {columnsWithMissing.length === 0 ? (
          <div className="flex items-center gap-2 text-green-700 bg-green-50 p-4 rounded-lg">
            <CheckCircle className="w-5 h-5" />
            <span>No missing values found! Your dataset is clean.</span>
          </div>
        ) : (
          <div className="space-y-3">
            {Object.entries(stats.missingValues)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 10)
              .map(([column, count]) => (
                <div key={column} className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-gray-700">{column}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-600">{count} missing</span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          stats.columnTypes[column] === 'numerical'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {stats.columnTypes[column]}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          stats.missingPercentage[column] > 50
                            ? 'bg-red-500'
                            : stats.missingPercentage[column] > 20
                            ? 'bg-orange-500'
                            : 'bg-yellow-500'
                        }`}
                        style={{ width: `${Math.min(stats.missingPercentage[column], 100)}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 w-12 text-right">
                      {stats.missingPercentage[column].toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">Data Preview</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-200">
                {data[0]?.slice(0, 6).map((header, i) => (
                  <th key={i} className="px-3 py-2 text-left font-semibold text-gray-700">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(1, 6).map((row, i) => (
                <tr key={i} className="border-b border-gray-200">
                  {row.slice(0, 6).map((cell, j) => (
                    <td
                      key={j}
                      className={`px-3 py-2 ${
                        !cell || cell.trim() === '' ? 'bg-red-50 text-red-600 font-medium' : ''
                      }`}
                    >
                      {cell || 'MISSING'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
      >
        Configure Cleaning Options
      </button>
    </div>
  );
}
