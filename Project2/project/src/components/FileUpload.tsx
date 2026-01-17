import { Upload } from 'lucide-react';
import { useRef } from 'react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

export default function FileUpload({ onFileUpload }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/csv') {
      onFileUpload(file);
    } else {
      alert('Please upload a valid CSV file');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      onFileUpload(file);
    } else {
      alert('Please upload a valid CSV file');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Dataset</h2>
        <p className="text-gray-600">Upload a CSV file to begin data cleaning</p>
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
        className="border-3 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
      >
        <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-700 mb-2">
          Click to upload or drag and drop
        </p>
        <p className="text-sm text-gray-500">CSV files only</p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Suggested Datasets:</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-blue-600 font-medium">1.</span>
            <div>
              <p className="font-medium text-gray-900">House Prices Dataset</p>
              <p className="text-gray-600">Features housing characteristics and sale prices</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-600 font-medium">2.</span>
            <div>
              <p className="font-medium text-gray-900">Medical Appointment No Shows</p>
              <p className="text-gray-600">Patient appointment and attendance data</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
