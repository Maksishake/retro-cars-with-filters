import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ImageGallery from '../../components/ImageGallery';
import TechnicalSpecs from '../../components/TechnicalSpecs';
import FeaturesAndHistory from '../../components/FeaturesAndHistory';
import SimilarCars from '../../components/SimilarCars';
import FavoriteButton from '../../components/FavoriteButton';
import CallButton from '../../components/CallButton';
import cars from '../../data/cars';

export default function CarDetail({ carId }) {
  const [activeTab, setActiveTab] = useState('description');
  const [car, setCar] = useState(null);
  const [allCars, setAllCars] = useState(cars);
  const [loading, setLoading] = useState(true);

  // Загружаем данные из localStorage при загрузке страницы
  useEffect(() => {
    const loadCarData = () => {
      try {
        const savedCars = JSON.parse(localStorage.getItem('cars') || '[]');
        let carsToUse = savedCars.length > 0 ? savedCars : cars;
        
        setAllCars(carsToUse);
        
        // Ищем автомобиль по ID
        const foundCar = carsToUse.find(c => c.id === carId);
        if (foundCar) {
          setCar(foundCar);
        } else {
          // Если не найден в сохраненных данных, ищем в статических
          const staticCar = cars.find(c => c.id === carId);
          if (staticCar) {
            setCar(staticCar);
          }
        }
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        // Fallback к статическим данным
        const staticCar = cars.find(c => c.id === carId);
        if (staticCar) {
          setCar(staticCar);
        }
      } finally {
        setLoading(false);
      }
    };

    loadCarData();
  }, [carId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Загрузка...</h1>
          <p className="text-gray-600">Загружаем информацию об автомобиле</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Автомобиль не найден</h1>
          <p className="text-xl text-gray-600 mb-8">К сожалению, запрашиваемый автомобиль не найден.</p>
          <Link href="/" className="btn-primary">
            Вернуться к каталогу
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Музейное':
        return 'bg-green-100 text-green-800';
      case 'Отличное':
        return 'bg-blue-100 text-blue-800';
      case 'Хорошее':
        return 'bg-yellow-100 text-yellow-800';
      case 'Требует реставрации':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'description', label: 'Описание', icon: '📝' },
    { id: 'specs', label: 'Характеристики', icon: '⚙️' },
    { id: 'features', label: 'Особенности', icon: '✨' },
    { id: 'history', label: 'История', icon: '📚' }
  ];

  return (
    <>
      <Head>
        <title>{car.name} - {car.brand} {car.year} | RetroCars</title>
        <meta name="description" content={car.description} />
        <meta name="keywords" content={`${car.name}, ${car.brand}, ${car.year}, советские автомобили, ретро автомобили, ${car.condition}`} />
        <meta property="og:title" content={`${car.name} - ${car.brand} ${car.year}`} />
        <meta property="og:description" content={car.description} />
        <meta property="og:image" content={car.image} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${car.name} - ${car.brand} ${car.year}`} />
        <meta name="twitter:description" content={car.description} />
        <meta name="twitter:image" content={car.image} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-red-600 transition-colors duration-200">
              Главная
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/" className="hover:text-red-600 transition-colors duration-200">
              Каталог
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium">{car.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Images and Basic Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <ImageGallery images={car.images} carName={car.name} />

              {/* Basic Information */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{car.name}</h1>
                    <p className="text-xl text-gray-600 mb-2">{car.brand} • {car.year}</p>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(car.condition)}`}>
                        {car.condition}
                      </span>
                      <span className="text-sm text-gray-500">📍 {car.location}</span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <div className="text-4xl font-bold text-red-600 mb-2">
                      {formatPrice(car.price, car.currency)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {car.mileage.toLocaleString()} км
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{car.year}</div>
                    <div className="text-sm text-gray-600">Год выпуска</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{car.mileage.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Пробег (км)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{car.fuelType}</div>
                    <div className="text-sm text-gray-600">Топливо</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{car.transmission}</div>
                    <div className="text-sm text-gray-600">Коробка</div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                          activeTab === tab.id
                            ? 'border-red-500 text-red-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <span className="mr-2">{tab.icon}</span>
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'description' && (
                    <div className="prose prose-gray max-w-none">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Описание</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">{car.description}</p>
                      {car.detailedDescription && (
                        <p className="text-gray-700 leading-relaxed">{car.detailedDescription}</p>
                      )}
                    </div>
                  )}

                  {activeTab === 'specs' && (
                    <TechnicalSpecs specs={car.technicalSpecs} />
                  )}

                  {activeTab === 'features' && (
                    <FeaturesAndHistory car={car} />
                  )}

                  {activeTab === 'history' && (
                    <div className="prose prose-gray max-w-none">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">История и реставрация</h3>
                      {car.history && (
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">История автомобиля</h4>
                          <p className="text-gray-700 leading-relaxed">{car.history}</p>
                        </div>
                      )}
                      {car.restoration && (
                        <FeaturesAndHistory car={car} />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Contact and Actions */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 sticky top-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Заинтересованы в этом автомобиле?</h3>
                
                <div className="space-y-4">
                  <FavoriteButton carId={car.id} carName={car.name} />
                  
                  <CallButton />
                  
                  <button className="w-full btn-secondary">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Написать сообщение
                  </button>
                  
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-xl transition-colors duration-200">
                    <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    В избранное
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Контактная информация</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      +49 30 12345678
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      info@retrocars.eu
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Берлин, Германия
                    </div>
                  </div>
                </div>
              </div>

              {/* Features List */}
              {car.features && car.features.length > 0 && (
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Оснащение</h3>
                  <div className="space-y-2">
                    {car.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Similar Cars */}
          <div className="mt-12">
            <SimilarCars currentCar={car} allCars={allCars} />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  // Возвращаем только ID, данные будем загружать на клиенте
  return {
    props: {
      carId: params.id,
    },
  };
}