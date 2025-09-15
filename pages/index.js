import { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CarCard from '../components/CarCard';
import SearchFilters from '../components/SearchFilters';
import StatsSection from '../components/StatsSection';
import NewsSection from '../components/NewsSection';
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
  const [fuelTypeFilter, setFuelTypeFilter] = useState('');
  const [transmissionFilter, setTransmissionFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [sortBy, setSortBy] = useState('price-asc');
  const [allCars, setAllCars] = useState(cars);

  // Загружаем данные из localStorage при загрузке страницы
  useEffect(() => {
    const loadCars = () => {
      const savedCars = JSON.parse(localStorage.getItem('cars') || '[]');
      if (savedCars.length > 0) {
        setAllCars(savedCars);
      }
    };
    
    loadCars();
    
    // Слушаем изменения в localStorage
    const handleStorageChange = () => {
      loadCars();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Также обновляем при фокусе на окне (когда возвращаемся с админки)
    window.addEventListener('focus', loadCars);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', loadCars);
    };
  }, []);

  // Get unique values for filters
  const allBrands = useMemo(() => [...new Set(allCars.map(car => car.brand))], [allCars]);
  const allYears = useMemo(() => [...new Set(allCars.map(car => car.year))].sort((a, b) => b - a), [allCars]);
  const allConditions = useMemo(() => [...new Set(allCars.map(car => car.condition))], [allCars]);
  const allLocations = useMemo(() => [...new Set(allCars.map(car => car.location))], [allCars]);
  const allCategories = useMemo(() => [...new Set(allCars.map(car => car.category))], [allCars]);
  const allFuelTypes = useMemo(() => [...new Set(allCars.map(car => car.fuelType))], [allCars]);
  const allTransmissions = useMemo(() => [...new Set(allCars.map(car => car.transmission))], [allCars]);
  const allColors = useMemo(() => [...new Set(allCars.map(car => car.color))], [allCars]);

  const filteredAndSortedCars = useMemo(() => {
    let filtered = allCars.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(search.toLowerCase()) ||
                           car.brand.toLowerCase().includes(search.toLowerCase()) ||
                           car.description.toLowerCase().includes(search.toLowerCase());
      
      const matchesYear = !yearFilter || car.year.toString() === yearFilter;
      const matchesBrand = !brandFilter || car.brand === brandFilter;
      const matchesCategory = !categoryFilter || car.category === categoryFilter;
      const matchesCondition = !conditionFilter || car.condition === conditionFilter;
      const matchesLocation = !locationFilter || car.location === locationFilter;
      const matchesFuelType = !fuelTypeFilter || car.fuelType === fuelTypeFilter;
      const matchesTransmission = !transmissionFilter || car.transmission === transmissionFilter;
      const matchesColor = !colorFilter || car.color === colorFilter;
      
      const matchesPriceMin = !priceRange.min || car.price >= parseInt(priceRange.min);
      const matchesPriceMax = !priceRange.max || car.price <= parseInt(priceRange.max);

      return matchesSearch && matchesYear && matchesBrand && matchesCategory && 
             matchesCondition && matchesLocation && matchesFuelType && matchesTransmission &&
             matchesColor && matchesPriceMin && matchesPriceMax;
    });

    // Sort cars
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'year-desc':
          return b.year - a.year;
        case 'year-asc':
          return a.year - b.year;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'mileage-asc':
          return a.mileage - b.mileage;
        case 'mileage-desc':
          return b.mileage - a.mileage;
        default:
          return 0;
      }
    });
  }, [allCars, search, yearFilter, brandFilter, categoryFilter, conditionFilter, 
      locationFilter, priceRange, fuelTypeFilter, transmissionFilter, colorFilter, sortBy]);

  return (
    <>
      <Head>
        <title>RetroCars - Советские ретро автомобили в Европе | Каталог</title>
        <meta name="description" content="Каталог советских ретро автомобилей в Западной Европе. Москвич, Волга, Жигули, Лада, ЗАЗ, УАЗ. Продажа и реставрация классических автомобилей." />
        <meta name="keywords" content="советские автомобили, ретро автомобили, Москвич, Волга, Жигули, Лада, ЗАЗ, УАЗ, классические автомобили, Европа, Германия, Нидерланды, Франция" />
        <meta property="og:title" content="RetroCars - Советские ретро автомобили в Европе" />
        <meta property="og:description" content="Каталог советских ретро автомобилей в Западной Европе" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.retrocars.eu" />
        <meta property="og:image" content="https://www.retrocars.eu/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RetroCars - Советские ретро автомобили в Европе" />
        <meta name="twitter:description" content="Каталог советских ретро автомобилей в Западной Европе" />
        <meta name="twitter:image" content="https://www.retrocars.eu/og-image.jpg" />
      </Head>

      <StructuredData data={{ cars }} />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Header />
        
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-red-800 via-red-700 to-red-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-red-800/90 to-red-900/90"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Советские ретро автомобили
            </h1>
            <p className="text-xl md:text-2xl text-red-100 mb-8 max-w-3xl mx-auto">
              Откройте для себя легендарные автомобили СССР в отличном состоянии. 
              Полная реставрация, оформление документов, доставка по всей Европе.
            </p>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search and Filters */}
          <SearchFilters
            search={search}
            setSearch={setSearch}
            yearFilter={yearFilter}
            setYearFilter={setYearFilter}
            brandFilter={brandFilter}
            setBrandFilter={setBrandFilter}
            conditionFilter={conditionFilter}
            setConditionFilter={setConditionFilter}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            fuelTypeFilter={fuelTypeFilter}
            setFuelTypeFilter={setFuelTypeFilter}
            transmissionFilter={transmissionFilter}
            setTransmissionFilter={setTransmissionFilter}
            colorFilter={colorFilter}
            setColorFilter={setColorFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            allBrands={allBrands}
            allYears={allYears}
            allConditions={allConditions}
            allLocations={allLocations}
            allCategories={allCategories}
            allFuelTypes={allFuelTypes}
            allTransmissions={allTransmissions}
            allColors={allColors}
            filteredCarsCount={filteredAndSortedCars.length}
          />

          {/* Cars Grid */}
          {filteredAndSortedCars.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Автомобили не найдены</h3>
              <p className="text-lg text-gray-600 mb-8">Попробуйте изменить параметры поиска</p>
              <button 
                onClick={() => {
                  setSearch('');
                  setYearFilter('');
                  setBrandFilter('');
                  setCategoryFilter('');
                  setConditionFilter('');
                  setLocationFilter('');
                  setPriceRange({ min: '', max: '' });
                  setFuelTypeFilter('');
                  setTransmissionFilter('');
                  setColorFilter('');
                  setSortBy('price-asc');
                }}
                className="btn-primary"
              >
                Сбросить фильтры
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </main>

        {/* Stats Section */}
        <StatsSection />

        {/* News Section */}
        <NewsSection />

        {/* Testimonials */}
        <Testimonials />

        <Footer />
      </div>
    </>
  );
}