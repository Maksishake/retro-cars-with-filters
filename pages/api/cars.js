import fs from 'fs';
import path from 'path';

const carsFilePath = path.join(process.cwd(), 'data', 'cars.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Получить все автомобили
    try {
      const carsData = fs.readFileSync(carsFilePath, 'utf8');
      const cars = JSON.parse(carsData);
      res.status(200).json(cars);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка чтения данных' });
    }
  } else if (req.method === 'POST') {
    // Добавить новый автомобиль
    try {
      const newCar = {
        id: Date.now().toString(),
        ...req.body,
        createdAt: new Date().toISOString()
      };
      
      const carsData = fs.readFileSync(carsFilePath, 'utf8');
      const cars = JSON.parse(carsData);
      cars.push(newCar);
      
      fs.writeFileSync(carsFilePath, JSON.stringify(cars, null, 2));
      res.status(201).json(newCar);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка сохранения данных' });
    }
  } else if (req.method === 'PUT') {
    // Обновить автомобиль
    try {
      const { id, ...updateData } = req.body;
      
      const carsData = fs.readFileSync(carsFilePath, 'utf8');
      const cars = JSON.parse(carsData);
      
      const carIndex = cars.findIndex(car => car.id === id);
      if (carIndex === -1) {
        return res.status(404).json({ error: 'Автомобиль не найден' });
      }
      
      cars[carIndex] = { ...cars[carIndex], ...updateData, updatedAt: new Date().toISOString() };
      
      fs.writeFileSync(carsFilePath, JSON.stringify(cars, null, 2));
      res.status(200).json(cars[carIndex]);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка обновления данных' });
    }
  } else if (req.method === 'DELETE') {
    // Удалить автомобиль
    try {
      const { id } = req.query;
      
      const carsData = fs.readFileSync(carsFilePath, 'utf8');
      const cars = JSON.parse(carsData);
      
      const filteredCars = cars.filter(car => car.id !== id);
      
      fs.writeFileSync(carsFilePath, JSON.stringify(filteredCars, null, 2));
      res.status(200).json({ message: 'Автомобиль удален' });
    } catch (error) {
      res.status(500).json({ error: 'Ошибка удаления данных' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
