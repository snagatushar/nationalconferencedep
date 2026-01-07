
import React from 'react';
import { CONFERENCE_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-800 pb-8">
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4">{CONFERENCE_INFO.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {CONFERENCE_INFO.type}<br />
              Organized by {CONFERENCE_INFO.organizedBy}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <p className="text-gray-400 text-sm">
              Coordinator: {CONFERENCE_INFO.coordinator.name}<br />
              Email: {CONFERENCE_INFO.coordinator.email}<br />
              Phone: {CONFERENCE_INFO.coordinator.phone}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Location</h4>
            <p className="text-gray-400 text-sm">
              {CONFERENCE_INFO.venue}<br />
              Bengaluru, Karnataka, India
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Scan for Brochure</h4>
            <div className="bg-white p-2 inline-block rounded-lg">
              <img 
                src="/brochure-qr.png" 
                alt="Website QR Code" 
                className="w-32 h-32 object-contain"
              />
            </div>
            <p className="text-gray-500 text-xs mt-2">Visit our website</p>
          </div>
        </div>
        <div className="pt-8 text-center text-gray-500 text-xs">
          <p>© {new Date().getFullYear()} {CONFERENCE_INFO.organizedBy}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
