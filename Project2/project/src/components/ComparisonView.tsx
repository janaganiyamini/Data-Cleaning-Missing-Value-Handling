import { Download, CheckCircle, TrendingDown } from 'lucide-react';
import { DataStats } from '../utils/dataProcessor';

interface ComparisonViewProps {
  originalStats: DataStats;
  cleanedStats: DataStats;
  originalData: string[][];
  cleanedData: string[][];
  onDownload: () => void;
}

export default function ComparisonView({
  originalStats,
  cleanedStats,
  originalData,
  cleanedData,
  onDownload,
}: ComparisonViewProps) {
  const originalMissing = Object.values(originalStats.missingValues).reduce((a, b) => a + b, 0);
  const cleanedMissing = Object.values(cleanedStats.missingValues).reduce((a, b) => a + b, 0);
  const rowsRemoved = originalStats.totalRows - cleanedStats.totalRows;
  const columnsRemoved = originalStats.totalColumns - cleanedStats.totalColumns;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dataset Cleaned Successfully!</h2>
        <p className="text-gray-600">Review the improvements and download your cleaned dataset</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="font-semibold text-red-900 mb-4">Before Cleaning</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-700">Rows</span>
              <span className="font-bold text-red-900">{originalStats.totalRows}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Columns</span>
              <span className="font-bold text-red-900">{originalStats.totalColumns}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Missing Values</span>
              <span className="font-bold text-red-900">{originalMissing}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Data Quality</span>
              <span className="font-bold text-red-900">
                {((1 - originalMissing / (originalStats.totalRows * originalStats.totalColumns)) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-semibold text-green-900 mb-4">After Cleaning</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-700">Rows</span>
              <span className="font-bold text-green-900">{cleanedStats.totalRows}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Columns</span>
              <span className="font-bold text-green-900">{cleanedStats.totalColumns}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Missing Values</span>
              <span className="font-bold text-green-900">{cleanedMissing}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Data Quality</span>
              <span className="font-bold text-green-900">
                {cleanedStats.totalRows > 0 && cleanedStats.totalColumns > 0
                  ? ((1 - cleanedMissing / (cleanedStats.totalRows * cleanedStats.totalColumns)) * 100).toFixed(1)
                  : '100.0'}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingDown className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-blue-900">Improvements</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Missing Values Reduced</p>
            <p className="text-2xl font-bold text-blue-900">
              {((1 - cleanedMissing / Math.max(originalMissing, 1)) * 100).toFixed(1)}%
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Rows Removed</p>
            <p className="text-2xl font-bold text-blue-900">{rowsRemoved}</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Columns Removed</p>
            <p className="text-2xl font-bold text-blue-900">{columnsRemoved}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">Cleaned Data Preview</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-200">
                {cleanedData[0]?.slice(0, 6).map((header, i) => (
                  <th key={i} className="px-3 py-2 text-left font-semibold text-gray-700">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cleanedData.slice(1, 6).map((row, i) => (
                <tr key={i} className="border-b border-gray-200">
                  {row.slice(0, 6).map((cell, j) => (
                    <td key={j} className="px-3 py-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={onDownload}
        className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2"
      >
        <Download className="w-5 h-5" />
        Download Cleaned Dataset
      </button>
    </div>
  );
}
