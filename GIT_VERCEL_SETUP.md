# 🔧 Настройка Git и Vercel для RetroCars

## 🎯 Цель
Исправить ошибку: `Git author Unknown must have access to the team Maksim's projects on Vercel to create deployments.`

## 📋 Шаг 1: Настройка Git

### 1.1 Проверка установки Git
```bash
git --version
```

### 1.2 Настройка пользователя Git
```bash
# Установите ваше имя (замените на реальное)
git config --global user.name "maksishake"

# Установите ваш email (замените на реальный)
git config --global user.email "your-email@example.com"
```

### 1.3 Проверка настроек
```bash
git config --global --list
```

### 1.4 Инициализация репозитория (если нужно)
```bash
# В папке проекта
git init
git add .
git commit -m "Initial commit: RetroCars project"
```

## 📋 Шаг 2: Настройка Vercel

### 2.1 Выход из текущего аккаунта
```bash
vercel logout
```

### 2.2 Вход в личный аккаунт
```bash
vercel login
```
- Выберите "Continue with GitHub" или "Continue with Email"
- Войдите в свой личный аккаунт (НЕ в команду)

### 2.3 Проверка аккаунта
```bash
vercel whoami
```
Должно показать: `maksishake` (ваш личный аккаунт)

### 2.4 Создание проекта в личном аккаунте
```bash
vercel
```
- Выберите "Set up and deploy"
- Название проекта: `retro-cars`
- Выберите личный аккаунт (НЕ команду)

## 📋 Шаг 3: Альтернативный способ - через Vercel Dashboard

### 3.1 Создание GitHub репозитория
1. Зайдите на [github.com](https://github.com)
2. Нажмите "New repository"
3. Название: `retro-cars`
4. Сделайте Public или Private
5. НЕ добавляйте README, .gitignore, лицензию
6. Нажмите "Create repository"

### 3.2 Загрузка файлов на GitHub
1. На странице репозитория нажмите "uploading an existing file"
2. Загрузите файлы из папки `retro-cars-with-filters`:
   
   **✅ Включить:**
   ```
   📁 components/
   📁 data/
   📁 pages/
   📁 public/
   📁 scripts/
   📁 styles/
   📄 .gitignore
   📄 next.config.js
   📄 package.json
   📄 package-lock.json
   📄 postcss.config.js
   📄 README.md
   📄 tailwind.config.js
   📄 vercel.json
   ```

   **❌ НЕ включать:**
   ```
   📁 .git/
   📁 .next/
   📁 .vercel/
   📁 node_modules/
   📁 .idea/
   ```

3. Commit message: `Initial commit: RetroCars project`
4. Нажмите "Commit changes"

### 3.3 Деплой через Vercel Dashboard
1. Зайдите на [vercel.com](https://vercel.com)
2. Войдите в личный аккаунт `maksishake`
3. Нажмите "New Project"
4. Выберите "Import Git Repository"
5. Найдите `retro-cars` репозиторий
6. Нажмите "Import"
7. Vercel автоматически определит Next.js
8. Нажмите "Deploy"

## 🔧 Решение проблем

### Проблема: Git не работает
**Решение:**
```bash
# Переустановите Git через Homebrew
brew install git

# Или через официальный сайт
# https://git-scm.com/download/mac
```

### Проблема: Vercel CLI не работает
**Решение:**
```bash
# Обновите Vercel CLI
npm install -g vercel@latest

# Или переустановите
npm uninstall -g vercel
npm install -g vercel@latest
```

### Проблема: Доступ к команде Vercel
**Решение:**
1. Используйте личный аккаунт Vercel (НЕ команду)
2. Или попросите администратора команды добавить вас
3. Или создайте проект в личном аккаунте

### Проблема: GitHub не подключается
**Решение:**
1. Проверьте настройки SSH ключей
2. Используйте HTTPS вместо SSH
3. Проверьте права доступа к репозиторию

## 🎯 Рекомендуемый подход

### Для быстрого деплоя:
1. **Создайте GitHub репозиторий** (через веб-интерфейс)
2. **Загрузите файлы** (через веб-интерфейс)
3. **Деплой через Vercel Dashboard** (через веб-интерфейс)

Этот способ обходит все проблемы с CLI и правами доступа.

## 📋 Проверка после настройки

### Git:
```bash
git config --global user.name    # должно показать ваше имя
git config --global user.email   # должно показать ваш email
```

### Vercel:
```bash
vercel whoami                    # должно показать ваш аккаунт
vercel projects list            # должно показать ваши проекты
```

## 🚀 После успешной настройки

Вы сможете:
- ✅ Деплоить через `vercel --prod`
- ✅ Управлять проектами через CLI
- ✅ Настраивать автоматический деплой
- ✅ Работать с переменными окружения

---

**Следуйте инструкциям пошагово, и все заработает! 🎉**
