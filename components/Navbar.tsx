
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeFZTZrYBeP0iqixb9CHqhdd-lOwhLl_w6z2uvMZqWU_pbB3w/viewform?usp=publish-editor';

const IFIM_URL = 'https://ifim.edu.in/';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [onLightBackground, setOnLightBackground] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/') {
      setOnLightBackground(true);
      return;
    }

    const updateBackgroundState = () => {
      const details = document.getElementById('details-section');
      const navHeight = 136;
      const threshold = details ? details.offsetTop - navHeight : window.innerHeight * 0.6;
      setOnLightBackground(window.scrollY + navHeight >= threshold);
    };

    updateBackgroundState();
    window.addEventListener('scroll', updateBackgroundState);

    return () => {
      window.removeEventListener('scroll', updateBackgroundState);
    };
  }, [location.pathname]);

  const linkClass = (path: string) => 
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive(path) 
        ? onLightBackground ? 'bg-gray-100 text-blue-900' : 'bg-white/20 text-white'
        : onLightBackground ? 'text-gray-700 hover:text-blue-900 hover:bg-gray-100' : 'text-gray-100 hover:text-white hover:bg-white/10'
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent border-none shadow-none">
      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
{/* fixed */}
      <div className={`relative max-w-10xl mx-auto pl-2 pr-4 sm:px-6 lg:px-8 transition-all duration-300 ${
        isMenuOpen ? 'bg-white shadow-lg' : ''
      } ${onLightBackground && !isMenuOpen ? 'bg-white/90 backdrop-blur-md shadow-sm' : ''}`}>
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3">
              <img
                src="/vik2.png"
                alt="Viksit Bharat Logo"
                className="h-25 w-40 md:h-26 md:w-26" 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className={linkClass('/')}>Home</Link>
            <Link to="/details" className={linkClass('/details')}>Details</Link>
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-400 text-blue-900 px-4 py-2 rounded-md text-sm font-semibold hover:bg-amber-500 transition-colors"
            >
              Register 
            </a>
            <a
              href={IFIM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <img
                src="/logo.png"
                alt="IFIM Institutions"
                className="h-20 w-20"
              />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <a
              href={IFIM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <img
                src="/logo.png"
                alt="IFIM Institutions"
                className="h-12 w-12"
              />
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md transition-colors ${
                onLightBackground || isMenuOpen ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-64 opacity-100 pb-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="flex flex-col space-y-2 px-2 pt-2">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/') ? 'bg-amber-50 text-amber-900' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/details" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/details') ? 'bg-amber-50 text-amber-900' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Details
            </Link>
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-amber-400 hover:bg-amber-500 text-center mt-4"
            >
              Register Now
            </a>
          </div>
        </div>
      </div>

      {/* News Flash Bar - Below Navbar */}
      <div className="bg-amber-400 text-white overflow-hidden py-0.5 relative z-40">
        <div className="animate-marquee inline-block whitespace-nowrap font-bold text-xs md:text-sm tracking-wide">
          📢 NEWS FLASH: Abstract Submission Deadline: 15 February 2026 — Submit your papers now! &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 📢 NEWS FLASH: Abstract Submission Deadline: 15 February 2026 — Submit your papers now!
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
