const fs = require('fs');
const path = require('path');

// Создаем дополнительные изображения для каждого автомобиля
const additionalImages = [
  {
    name: 'moskvich-412-interior',
    title: 'Москвич 412 - Салон',
    description: 'Восстановленный салон из натуральной кожи'
  },
  {
    name: 'moskvich-412-engine',
    title: 'Москвич 412 - Двигатель',
    description: 'Оригинальный двигатель после капремонта'
  },
  {
    name: 'moskvich-412-side',
    title: 'Москвич 412 - Боковой вид',
    description: 'Классические пропорции советского автомобиля'
  },
  {
    name: 'moskvich-412-rear',
    title: 'Москвич 412 - Задний вид',
    description: 'Оригинальные задние фонари'
  },
  {
    name: 'volga-gaz21-interior',
    title: 'Волга ГАЗ 21 - Салон',
    description: 'Оригинальный салон с деревянной отделкой'
  },
  {
    name: 'volga-gaz21-engine',
    title: 'Волга ГАЗ 21 - Двигатель',
    description: 'Легендарный двигатель в музейном состоянии'
  },
  {
    name: 'volga-gaz21-side',
    title: 'Волга ГАЗ 21 - Боковой вид',
    description: 'Классические линии советской Волги'
  },
  {
    name: 'volga-gaz21-rear',
    title: 'Волга ГАЗ 21 - Задний вид',
    description: 'Хромированные детали в отличном состоянии'
  },
  {
    name: 'zhiguli-2101-interior',
    title: 'Жигули 2101 - Салон',
    description: 'Оригинальный салон копейки'
  },
  {
    name: 'zhiguli-2101-engine',
    title: 'Жигули 2101 - Двигатель',
    description: 'Двигатель после ремонта'
  },
  {
    name: 'zhiguli-2101-side',
    title: 'Жигули 2101 - Боковой вид',
    description: 'Компактный и практичный дизайн'
  },
  {
    name: 'zhiguli-2101-rear',
    title: 'Жигули 2101 - Задний вид',
    description: 'Простой и функциональный задок'
  },
  {
    name: 'lada-2103-interior',
    title: 'Лада 2103 - Салон',
    description: 'Улучшенный салон с современными элементами'
  },
  {
    name: 'lada-2103-engine',
    title: 'Лада 2103 - Двигатель',
    description: 'Надежный двигатель после капремонта'
  },
  {
    name: 'lada-2103-side',
    title: 'Лада 2103 - Боковой вид',
    description: 'Современный дизайн для своего времени'
  },
  {
    name: 'lada-2103-rear',
    title: 'Лада 2103 - Задний вид',
    description: 'Стильный задок с улучшенной аэродинамикой'
  },
  {
    name: 'zaz-968m-interior',
    title: 'ЗАЗ 968М - Салон',
    description: 'Компактный салон заднемоторного автомобиля'
  },
  {
    name: 'zaz-968m-engine',
    title: 'ЗАЗ 968М - Двигатель',
    description: 'V-образный двигатель в задней части'
  },
  {
    name: 'zaz-968m-side',
    title: 'ЗАЗ 968М - Боковой вид',
    description: 'Уникальный дизайн советского компакткара'
  },
  {
    name: 'zaz-968m-rear',
    title: 'ЗАЗ 968М - Задний вид',
    description: 'Задняя дверь с двигателем'
  },
  {
    name: 'uaz-469-interior',
    title: 'УАЗ 469 - Салон',
    description: 'Практичный салон внедорожника'
  },
  {
    name: 'uaz-469-engine',
    title: 'УАЗ 469 - Двигатель',
    description: 'Мощный двигатель для бездорожья'
  },
  {
    name: 'uaz-469-side',
    title: 'УАЗ 469 - Боковой вид',
    description: 'Классический дизайн внедорожника'
  },
  {
    name: 'uaz-469-rear',
    title: 'УАЗ 469 - Задний вид',
    description: 'Запасное колесо и практичность'
  },
  {
    name: 'moskvich-2140-interior',
    title: 'Москвич 2140 - Салон',
    description: 'Последний салон московского автозавода'
  },
  {
    name: 'moskvich-2140-engine',
    title: 'Москвич 2140 - Двигатель',
    description: 'Двигатель требует ремонта'
  },
  {
    name: 'moskvich-2140-side',
    title: 'Москвич 2140 - Боковой вид',
    description: 'Современный дизайн для 1980-х'
  },
  {
    name: 'moskvich-2140-rear',
    title: 'Москвич 2140 - Задний вид',
    description: 'Стильный задок последнего Москвича'
  },
  {
    name: 'izh-2715-interior',
    title: 'ИЖ 2715 - Салон',
    description: 'Практичный салон коммерческого фургона'
  },
  {
    name: 'izh-2715-engine',
    title: 'ИЖ 2715 - Двигатель',
    description: 'Надежный двигатель для коммерческого использования'
  },
  {
    name: 'izh-2715-side',
    title: 'ИЖ 2715 - Боковой вид',
    description: 'Функциональный дизайн фургона'
  },
  {
    name: 'izh-2715-rear',
    title: 'ИЖ 2715 - Задний вид',
    description: 'Задние двери для удобной загрузки'
  }
];

const publicDir = path.join(__dirname, '..', 'public', 'images');

// Создаем директорию если не существует
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Создаем дополнительные SVG изображения
additionalImages.forEach(image => {
  const svgContent = `
<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-${image.name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f8fafc;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#e2e8f0;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="car-${image.name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#dc2626;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ef4444;stop-opacity:1" />
    </linearGradient>
    <filter id="shadow-${image.name}" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
    <filter id="glow-${image.name}" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge> 
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="600" height="400" fill="url(#bg-${image.name})" rx="20"/>
  
  <!-- Car Body -->
  <g filter="url(#shadow-${image.name})">
    <!-- Main body -->
    <ellipse cx="300" cy="280" rx="180" ry="40" fill="url(#car-${image.name})" opacity="0.9"/>
    <rect x="120" y="240" width="360" height="80" fill="url(#car-${image.name})" rx="20"/>
    
    <!-- Roof -->
    <ellipse cx="300" cy="200" rx="120" ry="30" fill="url(#car-${image.name})" opacity="0.8"/>
    <rect x="180" y="170" width="240" height="60" fill="url(#car-${image.name})" rx="15"/>
    
    <!-- Windows -->
    <rect x="200" y="180" width="160" height="40" fill="#87CEEB" opacity="0.6" rx="8"/>
    <rect x="240" y="180" width="80" height="40" fill="#4682B4" opacity="0.4" rx="8"/>
    
    <!-- Wheels -->
    <circle cx="200" cy="300" r="25" fill="#2F2F2F"/>
    <circle cx="200" cy="300" r="18" fill="#696969"/>
    <circle cx="200" cy="300" r="12" fill="#A9A9A9"/>
    <circle cx="200" cy="300" r="6" fill="#D3D3D3"/>
    
    <circle cx="400" cy="300" r="25" fill="#2F2F2F"/>
    <circle cx="400" cy="300" r="18" fill="#696969"/>
    <circle cx="400" cy="300" r="12" fill="#A9A9A9"/>
    <circle cx="400" cy="300" r="6" fill="#D3D3D3"/>
    
    <!-- Headlights -->
    <circle cx="150" cy="250" r="8" fill="#FFD700" filter="url(#glow-${image.name})"/>
    <circle cx="450" cy="250" r="8" fill="#FFD700" filter="url(#glow-${image.name})"/>
    
    <!-- Grille -->
    <rect x="280" y="240" width="40" height="20" fill="#2F2F2F" rx="5"/>
    <line x1="285" y1="245" x2="315" y2="245" stroke="#696969" stroke-width="2"/>
    <line x1="285" y1="250" x2="315" y2="250" stroke="#696969" stroke-width="2"/>
    <line x1="285" y1="255" x2="315" y2="255" stroke="#696969" stroke-width="2"/>
    
    <!-- Bumper -->
    <rect x="140" y="310" width="320" height="15" fill="#2F2F2F" rx="8"/>
    
    <!-- Door handles -->
    <rect x="220" y="260" width="8" height="3" fill="#2F2F2F" rx="2"/>
    <rect x="372" y="260" width="8" height="3" fill="#2F2F2F" rx="2"/>
  </g>
  
  <!-- Decorative elements -->
  <circle cx="100" cy="100" r="3" fill="#ef4444" opacity="0.6"/>
  <circle cx="500" cy="120" r="2" fill="#ef4444" opacity="0.4"/>
  <circle cx="80" cy="300" r="2" fill="#ef4444" opacity="0.5"/>
  <circle cx="520" cy="280" r="3" fill="#ef4444" opacity="0.3"/>
  
  <!-- Image title and description -->
  <text x="300" y="120" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#dc2626">
    ${image.title}
  </text>
  <text x="300" y="150" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#666">
    ${image.description}
  </text>
  
  <!-- Retro badge -->
  <circle cx="300" cy="350" r="30" fill="#ef4444" opacity="0.8"/>
  <text x="300" y="355" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white">
    RETRO
  </text>
</svg>`;

  const filePath = path.join(publicDir, `${image.name}.svg`);
  fs.writeFileSync(filePath, svgContent);
  console.log(`Created additional image: ${filePath}`);
});

console.log('All additional car images created successfully!');
console.log('Images include:');
console.log('- Interior views');
console.log('- Engine compartments');
console.log('- Side profiles');
console.log('- Rear views');
console.log('- Detailed descriptions');
