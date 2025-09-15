import { useState, useEffect } from 'react';

export default function FavoriteButton({ carId, carName }) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Загружаем состояние избранного при загрузке компонента
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(carId));
  }, [carId]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      // Удаляем из избранного
      const updatedFavorites = favorites.filter(id => id !== carId);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      // Добавляем в избранное
      favorites.push(carId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
        isFavorite
          ? 'bg-red-500 text-white hover:bg-red-600'
          : 'bg-white/20 text-gray-700 hover:bg-white/30'
      }`}
      title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
    >
      <svg
        className={`w-5 h-5 ${isFavorite ? 'fill-current' : 'stroke-current'}`}
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span className="hidden sm:inline">
        {isFavorite ? 'В избранном' : 'В избранное'}
      </span>
    </button>
  );
}
