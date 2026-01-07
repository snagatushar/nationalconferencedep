
import React, { useState, useEffect } from 'react';
import { Profession, RegistrationData, RegistrationResult } from '../types';
import { FEES } from '../constants';

interface RegisterProps {
  onComplete: (result: RegistrationResult) => void;
}

const Register: React.FC<RegisterProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: '',
    mobile: '',
    email: '',
    profession: Profession.RESEARCH_SCHOLAR,
    amount: FEES[Profession.RESEARCH_SCHOLAR]
  });

  const [idCardFile, setIdCardFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      amount: FEES[prev.profession as keyof typeof FEES] || 1500
    }));
  }, [formData.profession]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdCardFile(e.target.files[0]);
    }
  };

  const validate = () => {
    if (!formData.fullName.trim()) return "Full name is required";
    if (!/^[6-9]\d{9}$/.test(formData.mobile)) return "Enter a valid 10-digit Indian mobile number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Enter a valid email address";
    if (!idCardFile && formData.profession !== Profession.OBSERVER) return "Please upload your valid ID Card";
    return null;
  };

  const processPayment = async () => {
    const errorMsg = validate();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    setError(null);
    setIsProcessing(true);

    try {
      const options = {
        key: 'rzp_test_placeholder',
        amount: formData.amount * 100,
        currency: 'INR',
        name: 'Bharat Synapse @2047',
        description: `Registration for ${formData.profession}`,
        handler: function (response: any) {
          completeRegistration(response.razorpay_payment_id || 'pay_DEMO_' + Date.now());
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.mobile
        },
        theme: {
          color: '#1e3a8a'
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
      
      // Safety bypass for demo
      if (options.key === 'rzp_test_placeholder') {
          setTimeout(() => {
              if (isProcessing) {
                  const confirmMock = window.confirm("Mock Payment: Do you want to simulate a successful payment?");
                  if (confirmMock) {
                      completeRegistration('pay_SIMULATED_' + Math.random().toString(36).substr(2, 9));
                  } else {
                      setIsProcessing(false);
                  }
              }
          }, 1000);
      }

    } catch (err) {
      setError("Payment gateway failed to initialize.");
      setIsProcessing(false);
    }
  };

  const completeRegistration = async (paymentId: string) => {
    const registrationId = 'BS-' + Math.floor(Math.random() * 900000 + 100000);
    const result: RegistrationResult = {
      ...formData,
      registrationId,
      paymentId,
      paymentDate: new Date().toLocaleString()
    };
    setTimeout(() => {
      onComplete(result);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 serif">Register Now</h2>
          <p className="mt-2 text-sm text-gray-500 italic">Bharat Synapse @2047 Conference</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Your Name"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile No.</label>
              <input
                type="tel"
                name="mobile"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="10-digit number"
                value={formData.mobile}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
              <select
                name="profession"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                value={formData.profession}
                onChange={handleInputChange}
              >
                {Object.values(Profession).map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          {formData.profession !== Profession.OBSERVER && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Institutional ID Card</label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 bg-gray-50 text-sm"
              />
            </div>
          )}

          <div className="bg-blue-900 p-4 rounded-2xl flex justify-between items-center shadow-inner">
            <span className="text-blue-100 font-semibold text-sm">Amount to Pay:</span>
            <span className="text-2xl font-bold text-white">₹{formData.amount}</span>
          </div>

          {error && <div className="text-red-600 text-xs bg-red-50 p-3 rounded-lg border border-red-100">{error}</div>}

          <button
            type="button"
            onClick={processPayment}
            disabled={isProcessing}
            className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transform transition-all active:scale-95 ${
              isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isProcessing ? 'Connecting to Bank...' : 'Confirm & Pay'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
