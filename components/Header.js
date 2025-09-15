import Link from 'next/link';
import { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('ru');

  return (
    <header className="bg-gradient-to-r from-red-800 via-red-700 to-red-900 text-white shadow-2xl backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-white to-red-100 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-red-800 font-bold text-2xl">R</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white drop-shadow-lg">USSR Retro Cars</h1>
                <p className="text-sm text-red-200/90 font-medium drop-shadow-md">Soviet Classic Cars</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link href="/" className="px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-200 font-medium hover:scale-105">
              Главная
            </Link>
            <Link href="/about" className="px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-200 font-medium hover:scale-105">
              О нас
            </Link>
            <Link href="/blog" className="px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-200 font-medium hover:scale-105">
              Блог
            </Link>
            <Link href="/contact" className="px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-200 font-medium hover:scale-105">
              Контакты
            </Link>
            
            <div className="w-px h-8 bg-white/20 mx-2"></div>
            <LanguageSwitcher 
              currentLanguage={currentLanguage} 
              onLanguageChange={setCurrentLanguage} 
            />
            
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-red-200 focus:outline-none focus:text-red-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <div className="px-4 pt-4 pb-6 space-y-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <Link href="/" className="block px-4 py-3 rounded-xl hover:bg-white/20 transition-all duration-200 font-medium">
                Главная
              </Link>
              <Link href="/about" className="block px-4 py-3 rounded-xl hover:bg-white/20 transition-all duration-200 font-medium">
                О нас
              </Link>
              <Link href="/blog" className="block px-4 py-3 rounded-xl hover:bg-white/20 transition-all duration-200 font-medium">
                Блог
              </Link>
              <Link href="/contact" className="block px-4 py-3 rounded-xl hover:bg-white/20 transition-all duration-200 font-medium">
                Контакты
              </Link>
              <Link href="/admin" className="block px-4 py-3 rounded-xl hover:bg-white/20 transition-all duration-200 font-medium">
                Админ
              </Link>
              <div className="pt-2 border-t border-white/20">
                <LanguageSwitcher 
                  currentLanguage={currentLanguage} 
                  onLanguageChange={setCurrentLanguage} 
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}