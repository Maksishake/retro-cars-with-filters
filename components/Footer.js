import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-white to-red-100 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-red-800 font-bold text-xl">R</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold gradient-text">RetroCars</h3>
                <p className="text-sm text-gray-300">Soviet Classic Cars</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Специализируемся на продаже и реставрации советских ретро автомобилей в Западной Европе. 
              Более 10 лет опыта в области классических автомобилей.
            </p>
            <div className="flex space-x-4">
              <span className="text-sm text-gray-400">🇩🇪 Германия</span>
              <span className="text-sm text-gray-400">🇳🇱 Нидерланды</span>
              <span className="text-sm text-gray-400">🇫🇷 Франция</span>
              <span className="text-sm text-gray-400">🇪🇸 Испания</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Быстрые ссылки</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Главная
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200">
                  О нас
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Контакты</h4>
            <div className="space-y-2 text-gray-300">
              <p>📧 info@retrocars.eu</p>
              <p>📞 +49 30 12345678</p>
              <p>📍 Берлин, Германия</p>
              <p>🕒 Пн-Пт: 9:00-18:00</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 RetroCars. Все права защищены.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}