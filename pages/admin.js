import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageUpload from '../components/ImageUpload';
import { storage } from '../lib/storage';

export default function Admin() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
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

  // Проверяем аутентификацию при загрузке
  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Загружаем данные автомобилей
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const loadCars = () => {
      const savedCars = storage.getCars();
      if (savedCars.length > 0) {
        setCars(savedCars);
      } else {
        // Загружаем из файла cars.js при первом запуске
        import('../data/cars').then(module => {
          const defaultCars = module.default;
          setCars(defaultCars);
          storage.saveCars(defaultCars);
        });
      }
    };
    
    loadCars();
    
    // Слушаем изменения в других вкладках
    const unsubscribe = storage.onCarsUpdate((updatedCars) => {
      setCars(updatedCars);
    });
    
    return unsubscribe;
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    // Простая проверка логина и пароля
    if (loginData.username === 'admin' && loginData.password === 'retrocars2024') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
    } else {
      alert('Неверный логин или пароль');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

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
        const updatedCar = storage.updateCar(selectedCar.id, {
          ...formData,
          images: formData.images.map(img => img.url)
        });
        
        if (updatedCar) {
          setCars(storage.getCars());
          alert('Автомобиль успешно обновлен!');
          router.push(`/cars/${selectedCar.id}`);
        }
      } else {
        // Добавление нового автомобиля
        const newCar = storage.addCar({
          ...formData,
          currency: 'EUR',
          image: formData.images[0]?.url || '/images/default-car.svg',
          images: formData.images.map(img => img.url)
        });
        
        setCars(storage.getCars());
        alert('Автомобиль успешно добавлен!');
        
        router.push(`/cars/${newCar.id}`);
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
    if (confirm('Вы уверены, что хотите удалить этот автомобиль?')) {
      storage.deleteCar(carId);
      setCars(storage.getCars());
      alert('Автомобиль успешно удален!');
    }
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

  // Форма входа
  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Вход в админ-панель | RetroCars</title>
          <meta name="description" content="Вход в систему управления каталогом" />
        </Head>

        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
          <div className="max-w-md w-full mx-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Админ-панель</h1>
                <p className="text-gray-600">Войдите в систему управления каталогом</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Логин
                  </label>
                  <input
                    type="text"
                    value={loginData.username}
                    onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                    className="input-field"
                    required
                    placeholder="Введите логин"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Пароль
                  </label>
                  <input
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    className="input-field"
                    required
                    placeholder="Введите пароль"
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Войти
                </button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-sm font-medium text-blue-900 mb-2">Данные для входа:</h3>
                <p className="text-xs text-blue-800">
                  Логин: <strong>admin</strong><br />
                  Пароль: <strong>retrocars2024</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Админ-панель | RetroCars</title>
        <meta name="description" content="Управление каталогом автомобилей" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Админ-панель</h1>
              <p className="text-xl text-gray-600">Управление каталогом автомобилей</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              Выйти
            </button>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Список автомобилей ({cars.length})</h2>
              
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {cars.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Автомобили не найдены</p>
                    <p className="text-sm text-gray-400 mt-2">Добавьте первый автомобиль с помощью формы слева</p>
                  </div>
                ) : (
                  cars.map((car) => (
                    <div key={car.id} className="flex items-center justify-between p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors duration-200">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{car.name}</h3>
                        <p className="text-sm text-gray-600">{car.brand} • {car.year}</p>
                        <p className="text-sm text-red-600 font-semibold">{car.price} €</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {car.images?.length || 0} фото • {car.condition}
                        </p>
                      </div>
                      <div className="flex flex-col space-y-2 ml-4">
                        <button
                          onClick={() => editCar(car)}
                          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors duration-200 whitespace-nowrap"
                        >
                          Редактировать
                        </button>
                        <button
                          onClick={() => deleteCar(car.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors duration-200 whitespace-nowrap"
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
