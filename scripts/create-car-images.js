const fs = require('fs');
const path = require('path');

// Создаем красивые SVG изображения автомобилей в стиле 2025
const cars = [
  {
    name: 'moskvich-412',
    title: 'Москвич 412',
    year: '1978',
    color: '#8B4513',
    accent: '#D2691E',
    description: 'Классический советский седан'
  },
  {
    name: 'volga-gaz21',
    title: 'Волга ГАЗ 21',
    year: '1965',
    color: '#2F4F4F',
    accent: '#708090',
    description: 'Легендарная Волга'
  },
  {
    name: 'zhiguli-2101',
    title: 'Жигули 2101',
    year: '1975',
    color: '#DC143C',
    accent: '#FF6347',
    description: 'Популярная копейка'
  },
  {
    name: 'lada-2103',
    title: 'Лада 2103',
    year: '1982',
    color: '#4169E1',
    accent: '#87CEEB',
    description: 'Современная Лада'
  },
  {
    name: 'zaz-968m',
    title: 'ЗАЗ 968М',
    year: '1985',
    color: '#32CD32',
    accent: '#90EE90',
    description: 'Компактный ЗАЗ'
  },
  {
    name: 'uaz-469',
    title: 'УАЗ 469',
    year: '1980',
    color: '#228B22',
    accent: '#98FB98',
    description: 'Внедорожник УАЗ'
  },
  {
    name: 'moskvich-2140',
    title: 'Москвич 2140',
    year: '1988',
    color: '#800080',
    accent: '#DA70D6',
    description: 'Последний Москвич'
  },
  {
    name: 'izh-2715',
    title: 'ИЖ 2715',
    year: '1982',
    color: '#FF8C00',
    accent: '#FFA500',
    description: 'Коммерческий фургон'
  }
];

const publicDir = path.join(__dirname, '..', 'public', 'images');

// Создаем директорию если не существует
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Создаем современные SVG изображения автомобилей
cars.forEach(car => {
  const svgContent = `
<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-${car.name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f8fafc;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#e2e8f0;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="car-${car.name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${car.color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${car.accent};stop-opacity:1" />
    </linearGradient>
    <filter id="shadow-${car.name}" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
    <filter id="glow-${car.name}" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge> 
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="600" height="400" fill="url(#bg-${car.name})" rx="20"/>
  
  <!-- Car Body -->
  <g filter="url(#shadow-${car.name})">
    <!-- Main body -->
    <ellipse cx="300" cy="280" rx="180" ry="40" fill="url(#car-${car.name})" opacity="0.9"/>
    <rect x="120" y="240" width="360" height="80" fill="url(#car-${car.name})" rx="20"/>
    
    <!-- Roof -->
    <ellipse cx="300" cy="200" rx="120" ry="30" fill="url(#car-${car.name})" opacity="0.8"/>
    <rect x="180" y="170" width="240" height="60" fill="url(#car-${car.name})" rx="15"/>
    
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
    <circle cx="150" cy="250" r="8" fill="#FFD700" filter="url(#glow-${car.name})"/>
    <circle cx="450" cy="250" r="8" fill="#FFD700" filter="url(#glow-${car.name})"/>
    
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
  <circle cx="100" cy="100" r="3" fill="${car.accent}" opacity="0.6"/>
  <circle cx="500" cy="120" r="2" fill="${car.accent}" opacity="0.4"/>
  <circle cx="80" cy="300" r="2" fill="${car.accent}" opacity="0.5"/>
  <circle cx="520" cy="280" r="3" fill="${car.accent}" opacity="0.3"/>
  
  <!-- Car name and year -->
  <text x="300" y="120" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="${car.color}">
    ${car.title}
  </text>
  <text x="300" y="150" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#666">
    ${car.year} • ${car.description}
  </text>
  
  <!-- Retro badge -->
  <circle cx="300" cy="350" r="30" fill="${car.accent}" opacity="0.8"/>
  <text x="300" y="355" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white">
    RETRO
  </text>
</svg>`;

  const filePath = path.join(publicDir, `${car.name}.svg`);
  fs.writeFileSync(filePath, svgContent);
  console.log(`Created modern car image: ${filePath}`);
});

console.log('All modern car images created successfully!');
console.log('Images feature:');
console.log('- Modern gradient backgrounds');
console.log('- 3D shadow effects');
console.log('- Glowing headlights');
console.log('- Detailed car anatomy');
console.log('- Retro styling elements');
