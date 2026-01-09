
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ConferenceTicket from '../components/ConferenceTicket';
import { RegistrationResult } from '../types';

interface SuccessProps {
  data: RegistrationResult;
  onLogout: () => void;
}

const Success: React.FC<SuccessProps> = ({ data, onLogout }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadTicket = async () => {
    const ticketElement = document.getElementById('conference-ticket');
    if (!ticketElement) return;

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(ticketElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // For external images like QR code
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Calculate dimensions to fit nicely on A4
      const imgWidth = 180; // mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const x = (210 - imgWidth) / 2; // Center horizontally
      const y = 20; // Top margin

      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
      pdf.save(`Ticket-${data.registrationId}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF", error);
      alert("Failed to download ticket. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white-200 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-400 text-gray-400 rounded-full mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 serif mb-4">Registration Successful!</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Congratulations {data.fullName.split(' ')[0]}! Your registration for <strong>Bharat Synapse @2047</strong> has been confirmed. A confirmation email with your ticket has been sent to <strong>{data.email}</strong>.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div id="conference-ticket">
            <ConferenceTicket data={data} />
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-green-100">
              <h3 className="text-xl font-bold text-gray-900 serif mb-4">What's Next?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-400 text-black rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold">1</div>
                  <p className="text-sm text-gray-600">Your registration data has been securely saved to our database.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-400 text-black rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold">2</div>
                  <p className="text-sm text-gray-600">Abstract submission portal is now <strong>UNLOCKED</strong> for you.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-400 text-black rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold">3</div>
                  <p className="text-sm text-gray-600">Review the formatting guidelines before uploading your abstract.</p>
                </li>
              </ul>
              
              <Link 
                to="/abstract" 
                className="mt-8 block w-full text-center py-4 bg-gray-200 text-black rounded-xl font-bold shadow-lg hover:bg-amber-400 transition-colors transform active:scale-95"
              >
                Go to Abstract Upload
              </Link>
            </div>

            

            <button 
              onClick={handleDownloadTicket}
              disabled={isDownloading}
              className="w-full py-3 bg-gray-200 border border-gray-200 text-black rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-amber-400 disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {isDownloading ? 'Generating PDF...' : 'Download Ticket'}
            </button>
            
            <button 
              onClick={onLogout}
              className="w-full py-3 text-red-600 font-semibold hover:bg-red-50 rounded-xl transition-colors"
            >
              Logout / Register Another User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
