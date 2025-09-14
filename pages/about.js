import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  return (
    <>
      <Head>
        <title>О нас - RetroCars | Советские ретро автомобили в Европе</title>
        <meta name="description" content="RetroCars - специализированный дилер советских ретро автомобилей в Западной Европе. Более 10 лет опыта в реставрации и продаже классических автомобилей." />
        <meta name="keywords" content="советские автомобили, ретро автомобили, Москвич, Волга, Жигули, Лада, классические автомобили, Европа" />
        <meta property="og:title" content="О нас - RetroCars" />
        <meta property="og:description" content="Специализируемся на продаже и реставрации советских ретро автомобилей в Западной Европе" />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              О компании <span className="text-red-600">RetroCars</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Специализируемся на продаже и реставрации советских ретро автомобилей в Западной Европе. 
              Более 10 лет опыта в области классических автомобилей.
            </p>
          </div>

          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Наша история</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Компания RetroCars была основана в 2014 году группой энтузиастов советских автомобилей 
                  в Берлине. Начав с небольшой мастерской по реставрации, мы выросли в ведущего дилера 
                  классических советских автомобилей в Западной Европе.
                </p>
                <p>
                  За годы работы мы восстановили и продали более 500 автомобилей различных марок: 
                  от легендарных Волг и Москвичей до редких ЗАЗов и УАЗов. Каждый автомобиль 
                  проходит тщательную проверку и реставрацию нашими опытными мастерами.
                </p>
                <p>
                  Сегодня мы работаем в Германии, Нидерландах, Франции, Испании, Бельгии и Швейцарии, 
                  помогая коллекционерам и любителям классических автомобилей найти свою мечту.
                </p>
              </div>
            </div>
            <div className="bg-red-600 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Наши достижения</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-3xl font-bold mr-4">500+</span>
                  <span>Восстановленных автомобилей</span>
                </div>
                <div className="flex items-center">
                  <span className="text-3xl font-bold mr-4">10+</span>
                  <span>Лет опыта</span>
                </div>
                <div className="flex items-center">
                  <span className="text-3xl font-bold mr-4">6</span>
                  <span>Стран присутствия</span>
                </div>
                <div className="flex items-center">
                  <span className="text-3xl font-bold mr-4">98%</span>
                  <span>Довольных клиентов</span>
                </div>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Наши услуги</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🔧</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Реставрация</h3>
                <p className="text-gray-600">
                  Полная реставрация автомобилей с использованием оригинальных запчастей 
                  и современных технологий.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🚗</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Продажа</h3>
                <p className="text-gray-600">
                  Продажа отреставрированных автомобилей с гарантией качества 
                  и полным пакетом документов.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Поиск</h3>
                <p className="text-gray-600">
                  Поиск конкретных моделей автомобилей по запросу клиента 
                  в странах Восточной Европы.
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Наша команда</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Михаил Петров</h3>
                <p className="text-red-600 font-medium mb-2">Основатель и директор</p>
                <p className="text-gray-600 text-sm">
                  Более 15 лет опыта в реставрации классических автомобилей. 
                  Специалист по двигателям ВАЗ и ГАЗ.
                </p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Анна Козлова</h3>
                <p className="text-red-600 font-medium mb-2">Главный реставратор</p>
                <p className="text-gray-600 text-sm">
                  Эксперт по кузовным работам и покраске. 
                  Восстановила более 200 автомобилей.
                </p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Дмитрий Волков</h3>
                <p className="text-red-600 font-medium mb-2">Менеджер по продажам</p>
                <p className="text-gray-600 text-sm">
                  Специалист по работе с клиентами и поиску редких экземпляров 
                  в странах Восточной Европы.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-red-600 rounded-xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Готовы найти свой ретро автомобиль?</h2>
            <p className="text-xl mb-6">
              Свяжитесь с нами для консультации или просмотра каталога
            </p>
            <a 
              href="/contact" 
              className="bg-white text-red-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200 inline-block"
            >
              Связаться с нами
            </a>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}