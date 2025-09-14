import { useState } from 'react';

export default function SearchFilters({ 
  search, 
  setSearch, 
  yearFilter, 
  setYearFilter, 
  brandFilter, 
  setBrandFilter, 
  conditionFilter, 
  setConditionFilter, 
  priceRange, 
  setPriceRange, 
  locationFilter, 
  setLocationFilter, 
  categoryFilter, 
  setCategoryFilter, 
  fuelTypeFilter, 
  setFuelTypeFilter, 
  transmissionFilter, 
  setTransmissionFilter, 
  colorFilter, 
  setColorFilter, 
  sortBy, 
  setSortBy, 
  allBrands, 
  allYears, 
  allConditions, 
  allLocations, 
  allCategories, 
  allFuelTypes, 
  allTransmissions, 
  allColors,
  filteredCarsCount 
}) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const clearAllFilters = () => {
    setSearch('');
    setYearFilter('');
    setBrandFilter('');
    setConditionFilter('');
    setPriceRange({ min: '', max: '' });
    setLocationFilter('');
    setCategoryFilter('');
    setFuelTypeFilter('');
    setTransmissionFilter('');
    setColorFilter('');
    setSortBy('price-asc');
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Поиск по названию автомобиля..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-12 text-lg"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Quick Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Марка</label>
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="select-field"
          >
            <option value="">Все марки</option>
            {allBrands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Год выпуска</label>
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="select-field"
          >
            <option value="">Все годы</option>
            {allYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Состояние</label>
          <select
            value={conditionFilter}
            onChange={(e) => setConditionFilter(e.target.value)}
            className="select-field"
          >
            <option value="">Любое состояние</option>
            {allConditions.map(condition => (
              <option key={condition} value={condition}>{condition}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Сортировка</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select-field"
          >
            <option value="price-asc">Цена: по возрастанию</option>
            <option value="price-desc">Цена: по убыванию</option>
            <option value="year-desc">Год: новые сначала</option>
            <option value="year-asc">Год: старые сначала</option>
            <option value="name-asc">Название: А-Я</option>
            <option value="name-desc">Название: Я-А</option>
            <option value="mileage-asc">Пробег: меньше</option>
            <option value="mileage-desc">Пробег: больше</option>
          </select>
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-semibold transition-colors duration-200"
        >
          <span>Расширенные фильтры</span>
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${showAdvancedFilters ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 font-medium">
            Найдено: <span className="text-red-600 font-bold">{filteredCarsCount}</span> автомобилей
          </span>
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-500 hover:text-red-600 font-medium transition-colors duration-200"
          >
            Очистить все
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50/50 rounded-xl border border-gray-200/50">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Цена от (€)</label>
            <input
              type="number"
              placeholder="Минимум"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Цена до (€)</label>
            <input
              type="number"
              placeholder="Максимум"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Местоположение</label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="select-field"
            >
              <option value="">Все страны</option>
              {allLocations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Категория</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="select-field"
            >
              <option value="">Все категории</option>
              {allCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Топливо</label>
            <select
              value={fuelTypeFilter}
              onChange={(e) => setFuelTypeFilter(e.target.value)}
              className="select-field"
            >
              <option value="">Любое топливо</option>
              {allFuelTypes.map(fuelType => (
                <option key={fuelType} value={fuelType}>{fuelType}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Коробка передач</label>
            <select
              value={transmissionFilter}
              onChange={(e) => setTransmissionFilter(e.target.value)}
              className="select-field"
            >
              <option value="">Любая коробка</option>
              {allTransmissions.map(transmission => (
                <option key={transmission} value={transmission}>{transmission}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Цвет</label>
            <select
              value={colorFilter}
              onChange={(e) => setColorFilter(e.target.value)}
              className="select-field"
            >
              <option value="">Любой цвет</option>
              {allColors.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
