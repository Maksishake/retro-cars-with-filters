import Link from 'next/link';
import Image from 'next/image';

export default function SimilarCars({ currentCar, allCars }) {
  // Фильтруем похожие автомобили (исключаем текущий)
  const similarCars = allCars
    .filter(car => car.id !== currentCar.id)
    .slice(0, 4); // Показываем максимум 4 похожих автомобиля

  if (similarCars.length === 0) {
    return null;
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
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <svg className="w-6 h-6 mr-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        Похожие автомобили
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {similarCars.map((car) => (
          <Link
            key={car.id}
            href={`/cars/${car.id}`}
            className="group bg-white/50 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/70 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={car.image}
                alt={car.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(car.condition)}`}>
                  {car.condition}
                </span>
              </div>
              <div className="absolute top-2 left-2">
                <span className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                  {car.location}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-200">
                  {car.name}
                </h4>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full font-medium">
                  {car.year}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-2 font-medium">{car.brand}</p>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-red-600">
                  {formatPrice(car.price, car.currency)}
                </span>
                <span className="text-sm text-gray-500 font-medium">{car.mileage.toLocaleString()} км</span>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-3">
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  {car.fuelType}
                </span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  {car.transmission}
                </span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  {car.color}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                {car.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="text-center mt-6">
        <Link
          href="/"
          className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold transition-colors duration-200"
        >
          Смотреть все автомобили
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
