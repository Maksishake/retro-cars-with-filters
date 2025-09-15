// Простая система хранения данных
const STORAGE_KEY = 'retro_cars_data';

export const storage = {
  // Получить все автомобили
  getCars() {
    if (typeof window === 'undefined') return [];
    
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Ошибка чтения данных:', error);
      return [];
    }
  },

  // Сохранить автомобили
  saveCars(cars) {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
      // Синхронизируем с другими вкладками
      window.dispatchEvent(new CustomEvent('carsUpdated', { detail: cars }));
    } catch (error) {
      console.error('Ошибка сохранения данных:', error);
    }
  },

  // Добавить автомобиль
  addCar(car) {
    const cars = this.getCars();
    const newCar = {
      ...car,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    cars.push(newCar);
    this.saveCars(cars);
    return newCar;
  },

  // Обновить автомобиль
  updateCar(carId, updates) {
    const cars = this.getCars();
    const index = cars.findIndex(car => car.id === carId);
    if (index !== -1) {
      cars[index] = {
        ...cars[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.saveCars(cars);
      return cars[index];
    }
    return null;
  },

  // Удалить автомобиль
  deleteCar(carId) {
    const cars = this.getCars();
    const filteredCars = cars.filter(car => car.id !== carId);
    this.saveCars(filteredCars);
    return filteredCars;
  },

  // Получить автомобиль по ID
  getCarById(carId) {
    const cars = this.getCars();
    return cars.find(car => car.id === carId);
  },

  // Слушать изменения
  onCarsUpdate(callback) {
    if (typeof window === 'undefined') return;
    
    const handleUpdate = (event) => {
      callback(event.detail);
    };
    
    window.addEventListener('carsUpdated', handleUpdate);
    
    return () => {
      window.removeEventListener('carsUpdated', handleUpdate);
    };
  }
};
