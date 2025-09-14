# RetroCars - Советские ретро автомобили в Европе

Веб-приложение для продажи советских ретро автомобилей в Западной Европе. Построено на Next.js с использованием TailwindCSS.

## 🚗 Особенности

- **Каталог автомобилей** с детальной информацией
- **Расширенные фильтры** по марке, году, состоянию, цене и местоположению
- **Сортировка** по различным параметрам
- **Адаптивный дизайн** для всех устройств
- **SEO-оптимизация** с мета-тегами и sitemap
- **Мультиязычность** (RU, DE, FR, ES, NL)
- **Форма обратной связи** с валидацией
- **Готовность к деплою** на Vercel

## 🛠 Технологии

- **Next.js 14** - React фреймворк
- **TailwindCSS** - CSS фреймворк
- **React 18** - UI библиотека
- **Next/Image** - Оптимизация изображений
- **Next/Head** - SEO управление

## 📦 Установка

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd retro-cars-with-filters
```

2. Установите зависимости:
```bash
npm install
```

3. Запустите проект в режиме разработки:
```bash
npm run dev
```

4. Откройте [http://localhost:3000](http://localhost:3000) в браузере

## 🚀 Деплой на Vercel

### Автоматический деплой

1. Подключите репозиторий к Vercel
2. Vercel автоматически определит настройки Next.js
3. Деплой произойдет автоматически при push в main ветку

### Ручной деплой

1. Установите Vercel CLI:
```bash
npm i -g vercel
```

2. Войдите в аккаунт Vercel:
```bash
vercel login
```

3. Деплой:
```bash
vercel
```

4. Следуйте инструкциям в терминале

## 🔧 Настройка

### Переменные окружения

Создайте файл `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code
```

### Google Analytics

1. Получите ID отслеживания в Google Analytics
2. Замените `GA_MEASUREMENT_ID` в `pages/_app.js`
3. Добавьте ID в переменные окружения

### Google Search Console

1. Добавьте сайт в Google Search Console
2. Получите код верификации
3. Замените `YOUR_VERIFICATION_CODE` в `pages/_app.js`

## 📁 Структура проекта

```
retro-cars/
├── components/          # React компоненты
│   ├── Header.js       # Шапка сайта
│   ├── Footer.js       # Подвал сайта
│   └── CarCard.js      # Карточка автомобиля
├── data/               # Данные приложения
│   ├── cars.js         # Массив автомобилей
│   └── translations.js # Переводы
├── pages/              # Страницы Next.js
│   ├── index.js        # Главная страница
│   ├── about.js        # О нас
│   ├── contact.js      # Контакты
│   ├── cars/
│   │   └── [id].js     # Страница автомобиля
│   ├── _app.js         # Глобальные настройки
│   └── sitemap.xml.js  # Sitemap
├── public/             # Статические файлы
│   ├── images/         # Изображения автомобилей
│   └── robots.txt      # Robots.txt
├── styles/             # Стили
│   └── globals.css     # Глобальные стили
├── next.config.js      # Конфигурация Next.js
├── tailwind.config.js  # Конфигурация TailwindCSS
├── vercel.json         # Конфигурация Vercel
└── package.json        # Зависимости проекта
```

## 🎨 Кастомизация

### Добавление новых автомобилей

Отредактируйте файл `data/cars.js`:

```javascript
{
  id: 'unique-id',
  name: 'Название автомобиля',
  brand: 'Марка',
  year: 1980,
  price: 5000,
  currency: 'EUR',
  image: '/images/car-image.jpg',
  description: 'Описание автомобиля',
  condition: 'Отличное',
  mileage: 100000,
  fuelType: 'Бензин',
  transmission: 'Механическая',
  color: 'Красный',
  location: 'Германия',
  features: ['Радио', 'Отопление'],
  category: 'Седан'
}
```

### Изменение цветовой схемы

Отредактируйте `tailwind.config.js`:

```javascript
colors: {
  'soviet-red': {
    // Ваши цвета
  }
}
```

### Добавление языков

1. Добавьте переводы в `data/translations.js`
2. Обновите `supportedLanguages` массив
3. Добавьте флаги в компонент Header

## 📱 Адаптивность

Проект полностью адаптивен и поддерживает:
- Мобильные устройства (320px+)
- Планшеты (768px+)
- Десктопы (1024px+)
- Большие экраны (1280px+)

## 🔍 SEO

- Мета-теги для всех страниц
- Open Graph разметка
- Twitter Card поддержка
- Автоматический sitemap.xml
- Robots.txt
- Структурированные данные

## 🚀 Производительность

- Оптимизация изображений с Next/Image
- Lazy loading
- Минификация CSS и JS
- Кэширование статических ресурсов
- CDN через Vercel

## 📞 Поддержка

Для вопросов и поддержки:
- Email: info@retrocars.eu
- Телефон: +49 30 12345678

## 📄 Лицензия

MIT License - см. файл LICENSE для деталей.

---

**RetroCars** - Ваш надежный партнер в мире советских ретро автомобилей в Европе! 🇷🇺🇪🇺
