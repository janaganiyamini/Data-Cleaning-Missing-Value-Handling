import { useState } from 'react';
import { Settings } from 'lucide-react';
import { DataStats, ImputationOptions } from '../utils/dataProcessor';

interface ImputationSettingsProps {
  onClean: (options: ImputationOptions) => void;
  stats: DataStats;
}

export default function ImputationSettings({ onClean, stats }: ImputationSettingsProps) {
  const [options, setOptions] = useState<ImputationOptions>({
    numerical: 'median',
    categorical: 'mode',
    dropThreshold: 70,
  });

  const numericalColumns = Object.entries(stats.columnTypes).filter(
    ([_, type]) => type === 'numerical'
  ).length;
  const categoricalColumns = Object.entries(stats.columnTypes).filter(
    ([_, type]) => type === 'categorical'
  ).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClean(options);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Configure Cleaning Strategy</h2>
        <p className="text-gray-600">Choose how to handle missing values</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Numerical Columns ({numericalColumns})</h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="numerical"
                value="mean"
                checked={options.numerical === 'mean'}
                onChange={(e) => setOptions({ ...options, numerical: e.target.value as 'mean' })}
                className="mt-1"
              />
              <div>
                <div className="font-medium text-gray-900">Mean Imputation</div>
                <div className="text-sm text-gray-600">
                  Replace with average value. Best for normally distributed data.
                </div>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="numerical"
                value="median"
                checked={options.numerical === 'median'}
                onChange={(e) => setOptions({ ...options, numerical: e.target.value as 'median' })}
                className="mt-1"
              />
              <div>
                <div className="font-medium text-gray-900">Median Imputation (Recommended)</div>
                <div className="text-sm text-gray-600">
                  Replace with middle value. Robust against outliers.
                </div>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="numerical"
                value="drop"
                checked={options.numerical === 'drop'}
                onChange={(e) => setOptions({ ...options, numerical: e.target.value as 'drop' })}
                className="mt-1"
              />
              <div>
                <div className="font-medium text-gray-900">Drop Rows</div>
                <div className="text-sm text-gray-600">
                  Remove rows with missing values. Use when data is abundant.
                </div>
              </div>
            </label>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-purple-900">
              Categorical Columns ({categoricalColumns})
            </h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="categorical"
                value="mode"
                checked={options.categorical === 'mode'}
                onChange={(e) =>
                  setOptions({ ...options, categorical: e.target.value as 'mode' })
                }
                className="mt-1"
              />
              <div>
                <div className="font-medium text-gray-900">Mode Imputation (Recommended)</div>
                <div className="text-sm text-gray-600">
                  Replace with most frequent value. Standard for categories.
                </div>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="categorical"
                value="drop"
                checked={options.categorical === 'drop'}
                onChange={(e) =>
                  setOptions({ ...options, categorical: e.target.value as 'drop' })
                }
                className="mt-1"
              />
              <div>
                <div className="font-medium text-gray-900">Drop Rows</div>
                <div className="text-sm text-gray-600">
                  Remove rows with missing categorical values.
                </div>
              </div>
            </label>
          </div>
        </div>

        <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
          <h3 className="font-semibold text-orange-900 mb-4">Column Drop Threshold</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">
                Drop columns with more than {options.dropThreshold}% missing values
              </span>
              <span className="text-lg font-bold text-orange-900">{options.dropThreshold}%</span>
            </div>
            <input
              type="range"
              min="30"
              max="100"
              step="5"
              value={options.dropThreshold}
              onChange={(e) =>
                setOptions({ ...options, dropThreshold: Number(e.target.value) })
              }
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-600">
              <span>30% (Aggressive)</span>
              <span>70% (Balanced)</span>
              <span>100% (Conservative)</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
        >
          Clean Dataset
        </button>
      </form>
    </div>
  );
}
