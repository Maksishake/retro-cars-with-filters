import { useState } from 'react';
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

  const handleLanguageChange = (lang) => {
    onLanguageChange(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-white hover:text-red-200 transition-colors duration-200"
      >
        <span>{languageFlags[currentLanguage]}</span>
        <span className="hidden sm:inline">{languageNames[currentLanguage]}</span>
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
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
          <div className="py-1">
            {supportedLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-3 ${
                  currentLanguage === lang ? 'bg-red-50 text-red-600' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{languageFlags[lang]}</span>
                <span>{languageNames[lang]}</span>
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
