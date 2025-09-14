# 🚀 Простой деплой RetroCars на Vercel

## ❌ Проблема с CLI
Ошибка: `Git author Unknown must have access to the team Maksim's projects on Vercel to create deployments.`

## ✅ Решение: Деплой через Vercel Dashboard

### Шаг 1: Подготовка файлов
Проект уже готов! Все файлы находятся в папке `retro-cars-with-filters`.

### Шаг 2: Загрузка в GitHub
1. **Создайте новый репозиторий на GitHub:**
   - Зайдите на [github.com](https://github.com)
   - Нажмите "New repository"
   - Название: `retro-cars`
   - Сделайте публичным или приватным
   - НЕ добавляйте README, .gitignore или лицензию

2. **Загрузите файлы:**
   - Нажмите "uploading an existing file"
   - Перетащите все файлы из папки `retro-cars-with-filters`
   - Исключите папки: `node_modules`, `.next`, `.vercel`
   - Нажмите "Commit changes"

### Шаг 3: Деплой на Vercel
1. **Зайдите на Vercel:**
   - Откройте [vercel.com](https://vercel.com)
   - Войдите в аккаунт `maksishake`

2. **Создайте новый проект:**
   - Нажмите "New Project"
   - Выберите "Import Git Repository"
   - Найдите репозиторий `retro-cars`
   - Нажмите "Import"

3. **Настройки проекта:**
   - Vercel автоматически определит:
     - Framework: Next.js
     - Build Command: `npm run build`
     - Output Directory: `.next`
   - Нажмите "Deploy"

### Шаг 4: Ожидание деплоя
- Vercel установит зависимости
- Соберет проект
- Развернет на глобальной CDN
- Предоставит URL для доступа

## 🎯 Результат

После успешного деплоя вы получите:
- ✅ Рабочий сайт RetroCars
- ✅ URL вида: `https://retro-cars-xxx.vercel.app`
- ✅ Автоматический деплой при изменениях
- ✅ SSL сертификат
- ✅ Глобальная CDN

## 📋 Что включено в проект:

### Страницы:
- 🏠 Главная с каталогом и фильтрами
- ℹ️ О компании
- 📝 Блог со статьями
- 📞 Контакты с формой
- 🚗 Детальные страницы автомобилей
- ❌ Кастомная 404 страница

### Функции:
- 🔍 Поиск и фильтрация автомобилей
- 🌍 Мультиязычность (5 языков)
- 📱 Адаптивный дизайн
- 📊 SEO оптимизация
- ⭐ Отзывы клиентов
- 💬 Форма обратной связи

### Автомобили:
- Москвич 412 (1978)
- Волга ГАЗ 21 (1965)
- Жигули 2101 (1975)
- Лада 2103 (1982)
- ЗАЗ 968М (1985)
- УАЗ 469 (1980)
- Москвич 2140 (1988)
- ИЖ 2715 (1982)

## 🔧 Дополнительные настройки (опционально):

### 1. Кастомный домен
- Vercel Dashboard → Project → Domains
- Добавьте ваш домен
- Настройте DNS записи

### 2. Google Analytics
- Получите GA Measurement ID
- Vercel Dashboard → Project → Settings → Environment Variables
- Добавьте: `NEXT_PUBLIC_GA_ID=your-ga-id`

### 3. Google Search Console
- Добавьте сайт в GSC
- Получите код верификации
- Добавьте: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-code`

## 🚨 Важные файлы для загрузки:

### ✅ Включить:
- `pages/` - все страницы
- `components/` - все компоненты
- `data/` - данные автомобилей и переводы
- `styles/` - стили
- `public/` - статические файлы
- `package.json` - зависимости
- `next.config.js` - конфигурация Next.js
- `tailwind.config.js` - конфигурация TailwindCSS
- `vercel.json` - конфигурация Vercel
- `README.md` - документация

### ❌ Исключить:
- `node_modules/` - зависимости (устанавливаются автоматически)
- `.next/` - сборка (создается автоматически)
- `.vercel/` - локальные настройки Vercel
- `.git/` - Git репозиторий (создается на GitHub)

## 🎉 Готово!

После выполнения этих шагов у вас будет полностью рабочий сайт RetroCars, развернутый на Vercel!

**Удачного деплоя! 🚗✨**
