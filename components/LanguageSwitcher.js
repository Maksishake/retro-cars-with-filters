import { useState, useEffect, useRef } from 'react';
import { supportedLanguages } from '../data/translations';

const languageNames = {
  ru: 'Русский',
  de: 'Deutsch', 
  fr: 'Français',
  es: 'Español',
  nl: 'Nederlands'
};

const languageFlags = {
  ru: '🇷🇺',
  de: '🇩🇪',
  fr: '🇫🇷', 
  es: '🇪🇸',
  nl: '🇳🇱'
};

export default function LanguageSwitcher({ currentLanguage = 'ru', onLanguageChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLanguageChange = (lang) => {
    onLanguageChange(lang);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white hover:text-red-200 transition-all duration-200 rounded-lg hover:bg-white/10 backdrop-blur-sm"
      >
        <span className="text-lg">{languageFlags[currentLanguage]}</span>
        <span className="hidden sm:inline font-medium">{languageNames[currentLanguage]}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200/20 z-50 overflow-hidden">
          <div className="py-2">
            {supportedLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50/80 transition-all duration-200 flex items-center space-x-3 group ${
                  currentLanguage === lang ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <span className="text-xl">{languageFlags[lang]}</span>
                <span className="font-medium">{languageNames[lang]}</span>
                {currentLanguage === lang && (
                  <svg className="w-4 h-4 ml-auto text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
