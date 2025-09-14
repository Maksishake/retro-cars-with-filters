const fs = require('fs');
const path = require('path');

// Создаем placeholder изображения для автомобилей
const cars = [
  'moskvich-412.jpg',
  'volga-gaz21.jpg',
  'zhiguli-2101.jpg',
  'lada-2103.jpg',
  'zaz-968m.jpg',
  'uaz-469.jpg',
  'moskvich-2140.jpg',
  'izh-2715.jpg'
];

const publicDir = path.join(__dirname, '..', 'public', 'images');

// Создаем директорию если не существует
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Создаем простые SVG placeholder'ы
cars.forEach(carName => {
  const svgContent = `
<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="300" fill="#f3f4f6"/>
  <rect x="50" y="100" width="300" height="100" fill="#e5e7eb" rx="10"/>
  <circle cx="100" cy="200" r="20" fill="#d1d5db"/>
  <circle cx="300" cy="200" r="20" fill="#d1d5db"/>
  <text x="200" y="150" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#6b7280">
    ${carName.replace('.jpg', '').replace('-', ' ').toUpperCase()}
  </text>
  <text x="200" y="170" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#9ca3af">
    Placeholder Image
  </text>
</svg>`;

  const filePath = path.join(publicDir, carName.replace('.jpg', '.svg'));
  fs.writeFileSync(filePath, svgContent);
  console.log(`Created placeholder: ${filePath}`);
});

console.log('All placeholder images created successfully!');
console.log('Note: Replace these with actual car images before production.');
