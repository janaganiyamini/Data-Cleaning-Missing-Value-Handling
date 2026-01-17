import { useState } from 'react';
import { Upload, BarChart3, Download, BookOpen, HelpCircle } from 'lucide-react';
import { parseCSV, analyzeData, cleanData, exportToCSV, DataStats, ImputationOptions } from './utils/dataProcessor';
import FileUpload from './components/FileUpload';
import DataAnalysis from './components/DataAnalysis';
import ImputationSettings from './components/ImputationSettings';
import ComparisonView from './components/ComparisonView';
import EducationalContent from './components/EducationalContent';

type Step = 'upload' | 'analyze' | 'configure' | 'results';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [originalData, setOriginalData] = useState<string[][]>([]);
  const [cleanedData, setCleanedData] = useState<string[][]>([]);
  const [originalStats, setOriginalStats] = useState<DataStats | null>(null);
  const [cleanedStats, setCleanedStats] = useState<DataStats | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [showEducation, setShowEducation] = useState(false);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsed = parseCSV(text);
      setOriginalData(parsed);
      const stats = analyzeData(parsed);
      setOriginalStats(stats);
      setFileName(file.name);
      setCurrentStep('analyze');
    };
    reader.readAsText(file);
  };

  const handleClean = (options: ImputationOptions) => {
    if (originalData.length > 0 && originalStats) {
      const cleaned = cleanData(originalData, options, originalStats);
      setCleanedData(cleaned);
      const stats = analyzeData(cleaned);
      setCleanedStats(stats);
      setCurrentStep('results');
    }
  };

  const handleDownload = () => {
    const csv = exportToCSV(cleanedData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cleaned_${fileName}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setOriginalData([]);
    setCleanedData([]);
    setOriginalStats(null);
    setCleanedStats(null);
    setFileName('');
    setCurrentStep('upload');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Data Cleaning Lab</h1>
                <p className="text-sm text-gray-600">Master Missing Value Handling</p>
              </div>
            </div>
            <button
              onClick={() => setShowEducation(!showEducation)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              {showEducation ? 'Hide' : 'Learn'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showEducation && (
          <div className="mb-6">
            <EducationalContent />
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {['upload', 'analyze', 'configure', 'results'].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                      currentStep === step
                        ? 'bg-blue-600 text-white'
                        : index < ['upload', 'analyze', 'configure', 'results'].indexOf(currentStep)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700 capitalize">
                    {step}
                  </span>
                  {index < 3 && (
                    <div
                      className={`w-12 h-1 mx-2 ${
                        index < ['upload', 'analyze', 'configure', 'results'].indexOf(currentStep)
                          ? 'bg-green-500'
                          : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            {currentStep !== 'upload' && (
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Start Over
              </button>
            )}
          </div>

          {currentStep === 'upload' && <FileUpload onFileUpload={handleFileUpload} />}

          {currentStep === 'analyze' && originalStats && (
            <DataAnalysis
              stats={originalStats}
              data={originalData}
              onNext={() => setCurrentStep('configure')}
            />
          )}

          {currentStep === 'configure' && originalStats && (
            <ImputationSettings onClean={handleClean} stats={originalStats} />
          )}

          {currentStep === 'results' && originalStats && cleanedStats && (
            <ComparisonView
              originalStats={originalStats}
              cleanedStats={cleanedStats}
              originalData={originalData}
              cleanedData={cleanedData}
              onDownload={handleDownload}
            />
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Quick Tips</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>Upload CSV files with your dataset</li>
                <li>Mean imputation works best for normally distributed data</li>
                <li>Median imputation is robust against outliers</li>
                <li>Mode imputation is ideal for categorical variables</li>
                <li>Consider dropping columns with more than 50% missing values</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
