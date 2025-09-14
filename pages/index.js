import { useState, useMemo } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CarCard from '../components/CarCard';
import Testimonials from '../components/Testimonials';
import StructuredData from '../components/StructuredData';
import cars from '../data/cars';

export default function Home() {
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [conditionFilter, setConditionFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Get unique values for filters
  const brands = [...new Set(cars.map(car => car.brand))];
  const categories = [...new Set(cars.map(car => car.category))];
  const conditions = [...new Set(cars.map(car => car.condition))];
  const locations = [...new Set(cars.map(car => car.location))];
  const years = [...new Set(cars.map(car => car.year))].sort((a, b) => b - a);

  const filteredAndSortedCars = useMemo(() => {
    let filtered = cars.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(search.toLowerCase()) ||
                           car.brand.toLowerCase().includes(search.toLowerCase()) ||
                           car.description.toLowerCase().includes(search.toLowerCase());
      
      const matchesYear = !yearFilter || car.year.toString() === yearFilter;
      const matchesBrand = !brandFilter || car.brand === brandFilter;
      const matchesCategory = !categoryFilter || car.category === categoryFilter;
      const matchesCondition = !conditionFilter || car.condition === conditionFilter;
      const matchesLocation = !locationFilter || car.location === locationFilter;
      
      const matchesPriceMin = !priceRange.min || car.price >= parseInt(priceRange.min);
      const matchesPriceMax = !priceRange.max || car.price <= parseInt(priceRange.max);

      return matchesSearch && matchesYear && matchesBrand && matchesCategory && 
             matchesCondition && matchesLocation && matchesPriceMin && matchesPriceMax;
    });

    // Sort cars
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'year':
          aValue = a.year;
          bValue = b.year;
          break;
        case 'mileage':
          aValue = a.mileage;
          bValue = b.mileage;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [search, yearFilter, brandFilter, categoryFilter, conditionFilter, locationFilter, priceRange, sortBy, sortOrder]);

  const clearFilters = () => {
    setSearch('');
    setYearFilter('');
    setBrandFilter('');
    setCategoryFilter('');
    setConditionFilter('');
    setLocationFilter('');
    setPriceRange({ min: '', max: '' });
    setSortBy('name');
    setSortOrder('asc');
  };

  return (
    <>
      <Head>
        <title>RetroCars - Советские ретро автомобили в Европе | Каталог</title>
        <meta name="description" content="Каталог советских ретро автомобилей в Западной Европе. Москвич, Волга, Жигули, Лада, ЗАЗ, УАЗ. Продажа и реставрация классических автомобилей." />
        <meta name="keywords" content="советские автомобили, ретро автомобили, Москвич, Волга, Жигули, Лада, ЗАЗ, УАЗ, классические автомобили, Европа, Германия, Нидерланды, Франция" />
        <meta property="og:title" content="RetroCars - Советские ретро автомобили в Европе" />
        <meta property="og:description" content="Каталог советских ретро автомобилей в Западной Европе" />
        <meta property="og:type" content="website" />
      </Head>
      
      <StructuredData data={{ cars }} />

      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Каталог <span className="text-red-600">советских ретро автомобилей</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Откройте для себя уникальную коллекцию советских классических автомобилей. 
              Каждый экземпляр тщательно отобран и отреставрирован нашими мастерами.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 lg:mb-0">Фильтры и поиск</h2>
              <button
                onClick={clearFilters}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Очистить все фильтры
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Поиск</label>
                <input
                  type="text"
                  placeholder="Название, марка, описание..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Brand Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Марка</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={brandFilter}
                  onChange={(e) => setBrandFilter(e.target.value)}
                >
                  <option value="">Все марки</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Год выпуска</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                >
                  <option value="">Все годы</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Категория</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">Все категории</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Condition Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Состояние</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={conditionFilter}
                  onChange={(e) => setConditionFilter(e.target.value)}
                >
                  <option value="">Любое состояние</option>
                  {conditions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Местоположение</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                >
                  <option value="">Все страны</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Цена от (€)</label>
                <input
                  type="number"
                  placeholder="Минимум"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Цена до (€)</label>
                <input
                  type="number"
                  placeholder="Максимум"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                />
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Сортировка:</label>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">По названию</option>
                  <option value="price">По цене</option>
                  <option value="year">По году выпуска</option>
                  <option value="mileage">По пробегу</option>
                </select>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="asc">По возрастанию</option>
                  <option value="desc">По убыванию</option>
                </select>
              </div>
              <div className="text-sm text-gray-600">
                Найдено: {filteredAndSortedCars.length} автомобилей
              </div>
            </div>
          </div>

          {/* Results */}
          {filteredAndSortedCars.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Автомобили не найдены</h3>
              <p className="text-gray-600 mb-6">Попробуйте изменить параметры поиска</p>
              <button
                onClick={clearFilters}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Очистить фильтры
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </main>

        <Testimonials />
        <Footer />
      </div>
    </>
  );
}
