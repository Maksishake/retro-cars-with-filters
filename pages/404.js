import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Страница не найдена | RetroCars</title>
        <meta name="description" content="Страница не найдена. Вернитесь на главную страницу RetroCars для просмотра каталога советских ретро автомобилей." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            {/* 404 Illustration */}
            <div className="mb-8">
              <div className="text-9xl font-bold text-red-600 mb-4">404</div>
              <div className="text-6xl mb-4">🚗</div>
            </div>

            {/* Error Message */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Страница не найдена
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              К сожалению, запрашиваемая страница не существует. 
              Возможно, она была перемещена или удалена.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                href="/"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                На главную
              </Link>
              <Link 
                href="/cars"
                className="bg-white hover:bg-gray-50 text-red-600 font-bold py-3 px-8 rounded-lg border-2 border-red-600 transition-colors duration-200"
              >
                Каталог автомобилей
              </Link>
            </div>

            {/* Popular Links */}
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Популярные разделы
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link 
                  href="/"
                  className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🏠</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Главная</h3>
                    <p className="text-sm text-gray-600">Каталог автомобилей</p>
                  </div>
                </Link>

                <Link 
                  href="/about"
                  className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">ℹ️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">О нас</h3>
                    <p className="text-sm text-gray-600">Наша история</p>
                  </div>
                </Link>

                <Link 
                  href="/blog"
                  className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">📝</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Блог</h3>
                    <p className="text-sm text-gray-600">Статьи и новости</p>
                  </div>
                </Link>

                <Link 
                  href="/contact"
                  className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Контакты</h3>
                    <p className="text-sm text-gray-600">Связаться с нами</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Search Suggestion */}
            <div className="mt-12">
              <p className="text-gray-600 mb-4">
                Или воспользуйтесь поиском:
              </p>
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Поиск автомобилей..."
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
