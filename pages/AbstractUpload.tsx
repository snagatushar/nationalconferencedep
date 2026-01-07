
import React, { useState } from 'react';
import { AbstractData } from '../types';

interface AbstractUploadProps {
  regId: string;
}

const AbstractUpload: React.FC<AbstractUploadProps> = ({ regId }) => {
  const [formData, setFormData] = useState<Partial<AbstractData>>({
    registrationId: regId,
    title: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim() || !file) {
      setError("Please provide both title and the abstract file.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      // Simulation of uploading to Google Drive & saving to Google Sheets
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSuccess(true);
    } catch (err) {
      setError("Failed to upload abstract. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-12 rounded-3xl shadow-xl max-w-md w-full border border-green-100">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 serif mb-2">Abstract Submitted!</h2>
          <p className="text-gray-600 mb-8">
            Your abstract "<strong>{formData.title}</strong>" has been successfully uploaded for review. You will receive an email notification regarding the acceptance by Feb 12, 2026.
          </p>
          <button 
            onClick={() => window.location.hash = '/'} 
            className="w-full py-3 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-gray-900 serif mb-2">Upload Abstract</h1>
            <p className="text-gray-500 text-sm">Submit your research contribution for review</p>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Registration ID</label>
                <input
                  type="text"
                  readOnly
                  className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-gray-500 font-mono text-sm outline-none"
                  value={regId}
                />
              </div>
              <div className="flex items-center text-xs text-green-600 font-medium bg-green-50 p-3 rounded-xl border border-green-100">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                Verified & Locked Registration
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Title of the Abstract</label>
              <input
                type="text"
                name="title"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter the full title of your paper"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Abstract File (PDF / DOC)</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>{file ? file.name : "Upload a file"}</span>
                      <input type="file" name="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="sr-only" />
                    </label>
                    {!file && <p className="pl-1">or drag and drop</p>}
                  </div>
                  <p className="text-xs text-gray-500">PDF, DOC up to 10MB</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl">
              <h4 className="text-sm font-bold text-blue-900 mb-2">Formatting Checklist:</h4>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Font: Times New Roman, 12pt</li>
                <li>• Word Limit: 150-200 words</li>
                <li>• Plagiarism: Less than 10%</li>
                <li>• Style: APA / IEEE</li>
              </ul>
            </div>

            {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">{error}</div>}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transform transition-all active:scale-95 ${
                isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Uploading to Portal...' : 'Submit Abstract'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AbstractUpload;
