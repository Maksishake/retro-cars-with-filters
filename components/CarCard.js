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
    <div className="card-premium overflow-hidden group fade-in-up">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={car.image}
          alt={car.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm ${getConditionColor(car.condition)}`}>
            {car.condition}
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium">
            {car.location}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-2">
            <button className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-white transition-colors duration-200">
              ❤️ Избранное
            </button>
            <button className="bg-red-600/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-red-600 transition-colors duration-200">
              📞 Позвонить
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-200">
            {car.name}
          </h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full font-medium">{car.year}</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 font-medium">{car.brand}</p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl font-bold gradient-text">
            {formatPrice(car.price, car.currency)}
          </span>
          <span className="text-sm text-gray-500 font-medium">{car.mileage.toLocaleString()} км</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-gray-100/80 backdrop-blur-sm text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium">
            {car.fuelType}
          </span>
          <span className="bg-gray-100/80 backdrop-blur-sm text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium">
            {car.transmission}
          </span>
          <span className="bg-gray-100/80 backdrop-blur-sm text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium">
            {car.color}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-6 line-clamp-2 leading-relaxed">
          {car.description}
        </p>
        
        <Link 
          href={`/cars/${car.id}`}
          className="w-full btn-primary text-center block"
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}