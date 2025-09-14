import Link from 'next/link';
import Image from 'next/image';

export default function CarCard({ car }) {
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
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={car.image}
          alt={car.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(car.condition)}`}>
            {car.condition}
          </span>
        </div>
        <div className="absolute top-2 left-2">
          <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
            {car.location}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-200">
            {car.name}
          </h2>
          <span className="text-sm text-gray-500">{car.year}</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-2">{car.brand}</p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-red-600">
            {formatPrice(car.price, car.currency)}
          </span>
          <span className="text-sm text-gray-500">{car.mileage.toLocaleString()} км</span>
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
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {car.description}
        </p>
        
        <Link 
          href={`/cars/${car.id}`}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-center block"
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}