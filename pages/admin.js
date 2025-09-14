import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageUpload from '../components/ImageUpload';

export default function Admin() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    year: '',
    price: '',
    description: '',
    detailedDescription: '',
    condition: '',
    mileage: '',
    fuelType: '',
    transmission: '',
    color: '',
    location: '',
    category: '',
    features: [],
    specialFeatures: [],
    history: '',
    images: []
  });

  // Загружаем данные автомобилей
  useEffect(() => {
    const loadCars = async () => {
      try {
        // Сначала пробуем загрузить из localStorage
        const savedCars = JSON.parse(localStorage.getItem('cars') || '[]');
        if (savedCars.length > 0) {
          setCars(savedCars);
        } else {
          // Загружаем из файла cars.js
          const carsModule = await import('../data/cars');
          setCars(carsModule.default);
          // Сохраняем в localStorage для дальнейшего использования
          localStorage.setItem('cars', JSON.stringify(carsModule.default));
        }
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        setCars([]);
      }
    };
    
    loadCars();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInputChange = (field, value) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({
      ...prev,
      [field]: items
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file),
      file: file
    }));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  const saveCar = () => {
    try {
      if (isEditing && selectedCar) {
        // Редактирование существующего автомобиля
        const updatedCars = cars.map(car => 
          car.id === selectedCar.id ? { 
            ...formData, 
            id: selectedCar.id,
            updatedAt: new Date().toISOString()
          } : car
        );
        setCars(updatedCars);
        localStorage.setItem('cars', JSON.stringify(updatedCars));
        alert('Автомобиль успешно обновлен!');
      } else {
        // Добавление нового автомобиля
        const newCar = {
          ...formData,
          id: Date.now().toString(),
          currency: 'EUR',
          image: formData.images[0]?.url || '/images/default-car.svg',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        const updatedCars = [...cars, newCar];
        setCars(updatedCars);
        localStorage.setItem('cars', JSON.stringify(updatedCars));
        alert('Автомобиль успешно добавлен!');
      }
      
      resetForm();
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      alert('Ошибка при сохранении автомобиля');
    }
  };

  const editCar = (car) => {
    setSelectedCar(car);
    setFormData(car);
    setIsEditing(true);
  };

  const deleteCar = (carId) => {
    const updatedCars = cars.filter(car => car.id !== carId);
    setCars(updatedCars);
    localStorage.setItem('cars', JSON.stringify(updatedCars));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      year: '',
      price: '',
      description: '',
      detailedDescription: '',
      condition: '',
      mileage: '',
      fuelType: '',
      transmission: '',
      color: '',
      location: '',
      category: '',
      features: [],
      specialFeatures: [],
      history: '',
      images: []
    });
    setSelectedCar(null);
    setIsEditing(false);
  };

  return (
    <>
      <Head>
        <title>Админ-панель | RetroCars</title>
        <meta name="description" content="Управление каталогом автомобилей" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Админ-панель</h1>
            <p className="text-xl text-gray-600">Управление каталогом автомобилей</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Форма добавления/редактирования */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {isEditing ? 'Редактировать автомобиль' : 'Добавить новый автомобиль'}
              </h2>

              <form onSubmit={(e) => { e.preventDefault(); saveCar(); }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Название</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Марка</label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Год</label>
                    <input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Цена (€)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Пробег (км)</label>
                    <input
                      type="number"
                      name="mileage"
                      value={formData.mileage}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Краткое описание</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="input-field"
                    rows="3"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Подробное описание</label>
                  <textarea
                    name="detailedDescription"
                    value={formData.detailedDescription}
                    onChange={handleInputChange}
                    className="input-field"
                    rows="4"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Состояние</label>
                    <select
                      name="condition"
                      value={formData.condition}
                      onChange={handleInputChange}
                      className="select-field"
                      required
                    >
                      <option value="">Выберите состояние</option>
                      <option value="Музейное">Музейное</option>
                      <option value="Отличное">Отличное</option>
                      <option value="Хорошее">Хорошее</option>
                      <option value="Требует реставрации">Требует реставрации</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Топливо</label>
                    <select
                      name="fuelType"
                      value={formData.fuelType}
                      onChange={handleInputChange}
                      className="select-field"
                      required
                    >
                      <option value="">Выберите топливо</option>
                      <option value="Бензин">Бензин</option>
                      <option value="Дизель">Дизель</option>
                      <option value="Газ">Газ</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Коробка передач</label>
                    <select
                      name="transmission"
                      value={formData.transmission}
                      onChange={handleInputChange}
                      className="select-field"
                      required
                    >
                      <option value="">Выберите коробку</option>
                      <option value="Механическая">Механическая</option>
                      <option value="Автоматическая">Автоматическая</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Цвет</label>
                    <input
                      type="text"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Местоположение</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Категория</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="select-field"
                      required
                    >
                      <option value="">Выберите категорию</option>
                      <option value="Седан">Седан</option>
                      <option value="Хэтчбек">Хэтчбек</option>
                      <option value="Внедорожник">Внедорожник</option>
                      <option value="Фургон">Фургон</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Оснащение (через запятую)</label>
                  <input
                    type="text"
                    value={formData.features.join(', ')}
                    onChange={(e) => handleArrayInputChange('features', e.target.value)}
                    className="input-field"
                    placeholder="Кондиционер, Радио, Кожаный салон"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Особенности (через запятую)</label>
                  <input
                    type="text"
                    value={formData.specialFeatures.join(', ')}
                    onChange={(e) => handleArrayInputChange('specialFeatures', e.target.value)}
                    className="input-field"
                    placeholder="Полная реставрация, Оригинальный двигатель"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">История автомобиля</label>
                  <textarea
                    name="history"
                    value={formData.history}
                    onChange={handleInputChange}
                    className="input-field"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Фотографии и видео (до 30 файлов)
                  </label>
                  <ImageUpload
                    onImagesChange={(images) => setFormData(prev => ({ ...prev, images }))}
                    existingImages={formData.images}
                    maxFiles={30}
                  />
                </div>

                <div className="flex space-x-4">
                  <button type="submit" className="btn-primary">
                    {isEditing ? 'Сохранить изменения' : 'Добавить автомобиль'}
                  </button>
                  {isEditing && (
                    <button type="button" onClick={resetForm} className="btn-secondary">
                      Отмена
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Список автомобилей */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Список автомобилей</h2>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {cars.map((car) => (
                  <div key={car.id} className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{car.name}</h3>
                      <p className="text-sm text-gray-600">{car.brand} • {car.year}</p>
                      <p className="text-sm text-red-600 font-semibold">{car.price} €</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => editCar(car)}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={() => deleteCar(car.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
