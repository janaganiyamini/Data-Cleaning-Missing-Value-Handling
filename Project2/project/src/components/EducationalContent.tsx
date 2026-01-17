import { BookOpen, HelpCircle } from 'lucide-react';

export default function EducationalContent() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
        <BookOpen className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">Learn: Data Cleaning Concepts</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Mean vs Median Imputation?</h3>
              <p className="text-sm text-blue-800 leading-relaxed">
                <strong>Mean:</strong> Average of all values. Use for normally distributed data without outliers.
                <br />
                <strong>Median:</strong> Middle value. Better for skewed data or when outliers exist. More robust.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-5 border border-green-200">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-green-900 mb-2">When Should Rows Be Dropped?</h3>
              <p className="text-sm text-green-800 leading-relaxed">
                Drop rows when: (1) Missing values are completely random, (2) You have abundant data,
                (3) Missing values are small percentage, (4) Imputation might introduce bias.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 rounded-lg p-5 border border-orange-200">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-orange-900 mb-2">Why Missing Data Is Harmful?</h3>
              <p className="text-sm text-orange-800 leading-relaxed">
                Missing data: (1) Reduces statistical power, (2) Introduces bias,
                (3) Affects model performance, (4) Can lead to wrong conclusions, (5) Reduces sample representativeness.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-5 border border-purple-200">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-purple-900 mb-2">What Is Data Leakage?</h3>
              <p className="text-sm text-purple-800 leading-relaxed">
                When information from test set leaks into training data. For example:
                computing mean on entire dataset before train-test split. Always split first, then clean!
              </p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-5 border border-red-200">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-red-900 mb-2">What Is Data Quality?</h3>
              <p className="text-sm text-red-800 leading-relaxed">
                Measures of: (1) Accuracy - correctness, (2) Completeness - no missing values,
                (3) Consistency - uniform format, (4) Timeliness - up-to-date, (5) Validity - within expected range.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-teal-50 rounded-lg p-5 border border-teal-200">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-teal-900 mb-2">Mode Imputation</h3>
              <p className="text-sm text-teal-800 leading-relaxed">
                Replace missing values with most frequent value. Perfect for categorical variables
                like gender, country, or categories. Preserves distribution of categories.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg p-5">
        <h3 className="font-semibold text-gray-900 mb-3">Best Practices</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">1.</span>
            <span>Always analyze missing patterns before cleaning</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">2.</span>
            <span>Document all cleaning decisions for reproducibility</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">3.</span>
            <span>Consider domain knowledge when choosing imputation methods</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">4.</span>
            <span>Validate cleaned data before using in models</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">5.</span>
            <span>Keep original dataset as backup</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
