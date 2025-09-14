import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-red-800 to-red-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-red-800 font-bold text-xl">R</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">RetroCars</h1>
                <p className="text-sm text-red-200">Soviet Classic Cars</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-red-200 transition-colors duration-200 font-medium">
              Главная
            </Link>
            <Link href="/about" className="hover:text-red-200 transition-colors duration-200 font-medium">
              О нас
            </Link>
            <Link href="/blog" className="hover:text-red-200 transition-colors duration-200 font-medium">
              Блог
            </Link>
            <Link href="/contact" className="hover:text-red-200 transition-colors duration-200 font-medium">
              Контакты
            </Link>
            <div className="flex items-center space-x-2">
              <span className="text-sm">🇩🇪</span>
              <span className="text-sm">🇳🇱</span>
              <span className="text-sm">🇫🇷</span>
              <span className="text-sm">🇪🇸</span>
            </div>
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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-red-900 rounded-lg mb-4">
              <Link href="/" className="block px-3 py-2 hover:text-red-200 transition-colors duration-200">
                Главная
              </Link>
              <Link href="/about" className="block px-3 py-2 hover:text-red-200 transition-colors duration-200">
                О нас
              </Link>
              <Link href="/blog" className="block px-3 py-2 hover:text-red-200 transition-colors duration-200">
                Блог
              </Link>
              <Link href="/contact" className="block px-3 py-2 hover:text-red-200 transition-colors duration-200">
                Контакты
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}