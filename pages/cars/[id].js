import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import cars from '../../data/cars';

export default function CarDetail() {
  const router = useRouter();
  const { id } = router.query;
  
  const car = cars.find(c => c.id === id);

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Автомобиль не найден</h1>
            <p className="text-xl text-gray-600 mb-8">К сожалению, запрашиваемый автомобиль не найден.</p>
            <Link href="/" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200">
              Вернуться к каталогу
            </Link>
          </div>
        </main>
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

  return (
    <>
      <Head>
        <title>{car.name} ({car.year}) - RetroCars | {formatPrice(car.price, car.currency)}</title>
        <meta name="description" content={`${car.description} Год: ${car.year}, Пробег: ${car.mileage.toLocaleString()} км, Состояние: ${car.condition}. Находится в ${car.location}.`} />
        <meta name="keywords" content={`${car.name}, ${car.brand}, ${car.year}, советский автомобиль, ретро автомобиль, ${car.location}`} />
        <meta property="og:title" content={`${car.name} (${car.year}) - RetroCars`} />
        <meta property="og:description" content={car.description} />
        <meta property="og:image" content={car.image} />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-red-600">Главная</Link></li>
              <li>/</li>
              <li><Link href="/" className="hover:text-red-600">Каталог</Link></li>
              <li>/</li>
              <li className="text-gray-900">{car.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-96 bg-white rounded-xl shadow-lg overflow-hidden">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(car.condition)}`}>
                    {car.condition}
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm">
                    {car.location}
                  </span>
                </div>
              </div>
              
              {/* Additional images placeholder */}
              <div className="grid grid-cols-3 gap-2">
                <div className="h-24 bg-gray-200 rounded-lg"></div>
                <div className="h-24 bg-gray-200 rounded-lg"></div>
                <div className="h-24 bg-gray-200 rounded-lg"></div>
              </div>
            </div>

            {/* Car Details */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{car.name}</h1>
                <p className="text-xl text-gray-600 mb-4">{car.brand} • {car.year} год</p>
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-bold text-red-600">
                    {formatPrice(car.price, car.currency)}
                  </span>
                  <span className="text-lg text-gray-500">{car.mileage.toLocaleString()} км</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Описание</h2>
                <p className="text-gray-600 leading-relaxed">{car.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Технические характеристики</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Топливо:</span>
                      <span className="font-medium">{car.fuelType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Коробка передач:</span>
                      <span className="font-medium">{car.transmission}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Цвет:</span>
                      <span className="font-medium">{car.color}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Категория:</span>
                      <span className="font-medium">{car.category}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Особенности</h3>
                  <div className="space-y-2">
                    {car.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-red-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Заинтересованы в этом автомобиле?</h3>
                <p className="text-gray-600 mb-4">
                  Свяжитесь с нами для получения дополнительной информации, 
                  организации просмотра или тест-драйва.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="/contact" 
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-center"
                  >
                    Связаться с нами
                  </a>
                  <a 
                    href="tel:+493012345678" 
                    className="bg-white hover:bg-gray-50 text-red-600 font-bold py-3 px-6 rounded-lg border-2 border-red-600 transition-colors duration-200 text-center"
                  >
                    Позвонить сейчас
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Related Cars */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Похожие автомобили</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cars
                .filter(c => c.id !== car.id && c.brand === car.brand)
                .slice(0, 3)
                .map(relatedCar => (
                  <Link key={relatedCar.id} href={`/cars/${relatedCar.id}`}>
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <div className="relative h-48">
                        <Image
                          src={relatedCar.image}
                          alt={relatedCar.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-2">{relatedCar.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{relatedCar.year} • {relatedCar.mileage.toLocaleString()} км</p>
                        <p className="text-red-600 font-bold">{formatPrice(relatedCar.price, relatedCar.currency)}</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}