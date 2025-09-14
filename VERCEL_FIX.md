# 🔧 Исправление ошибки Vercel

## Проблема
При деплое на Vercel появляется ошибка:
```
If `rewrites`, `redirects`, `headers`, `cleanUrls` or `trailingSlash` are used, then `routes` cannot be present.
```

## ✅ Решение

### 1. Исправлен vercel.json
Заменили `routes` на `rewrites` в файле `vercel.json`:

**Было:**
```json
{
  "routes": [
    {
      "src": "/sitemap.xml",
      "dest": "/sitemap.xml"
    }
  ]
}
```

**Стало:**
```json
{
  "rewrites": [
    {
      "source": "/sitemap.xml",
      "destination": "/sitemap.xml"
    }
  ]
}
```

### 2. Исправлены Google Analytics скрипты
Заменили использование `next/head` для скриптов на `next/script`:

**Было:**
```jsx
<Head>
  <script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
</Head>
```

**Стало:**
```jsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

### 3. Добавлены favicon файлы
Создали простые SVG favicon файлы для избежания 404 ошибок:
- `/public/favicon.ico`
- `/public/favicon-16x16.png`
- `/public/favicon-32x32.png`
- `/public/apple-touch-icon.png`

## 🚀 Теперь можно деплоить!

1. **Проверьте сборку:**
```bash
npm run build
```

2. **Деплой на Vercel:**
```bash
vercel --prod
```

Или через Vercel Dashboard - просто подключите репозиторий.

## 📋 Что исправлено:

- ✅ `vercel.json` - заменены `routes` на `rewrites`
- ✅ Google Analytics - используется `next/script`
- ✅ Favicon файлы - добавлены для избежания 404
- ✅ Сборка проходит без ошибок
- ✅ Готово к деплою на Vercel

## 🔍 Проверка

После деплоя проверьте:
- [ ] Сайт загружается без ошибок
- [ ] Sitemap доступен по `/sitemap.xml`
- [ ] Robots.txt доступен по `/robots.txt`
- [ ] Favicon отображается в браузере
- [ ] Google Analytics работает (если настроен)

---

**Проект готов к деплою! 🚀**
