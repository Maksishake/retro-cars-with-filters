import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

const blogPosts = [
  {
    id: 1,
    title: 'История советского автопрома: от Москвича до Волги',
    excerpt: 'Погрузитесь в увлекательную историю создания и развития советского автомобилестроения, узнайте о легендарных моделях и их влиянии на мировую автомобильную индустрию.',
    image: '/images/blog/soviet-automotive-history.jpg',
    date: '2024-01-20',
    readTime: '8 мин',
    category: 'История',
    author: 'Михаил Петров'
  },
  {
    id: 2,
    title: 'Как правильно выбрать советский ретро автомобиль',
    excerpt: 'Подробное руководство по выбору советского классического автомобиля: на что обратить внимание, как проверить состояние и избежать типичных ошибок.',
    image: '/images/blog/choosing-soviet-car.jpg',
    date: '2024-01-15',
    readTime: '6 мин',
    category: 'Советы',
    author: 'Анна Козлова'
  },
  {
    id: 3,
    title: 'Реставрация Жигулей 2101: пошаговое руководство',
    excerpt: 'Детальный процесс восстановления легендарной "копейки" - от разборки до покраски. Советы от наших мастеров и секреты качественной реставрации.',
    image: '/images/blog/zhiguli-restoration.jpg',
    date: '2024-01-10',
    readTime: '12 мин',
    category: 'Реставрация',
    author: 'Дмитрий Волков'
  },
  {
    id: 4,
    title: 'Топ-10 самых редких советских автомобилей в Европе',
    excerpt: 'Обзор самых редких и ценных советских автомобилей, которые можно встретить в Европе. Уникальные экземпляры и их история.',
    image: '/images/blog/rare-soviet-cars.jpg',
    date: '2024-01-05',
    readTime: '10 мин',
    category: 'Коллекционирование',
    author: 'Михаил Петров'
  },
  {
    id: 5,
    title: 'Оформление документов на советский автомобиль в ЕС',
    excerpt: 'Полное руководство по легализации и регистрации советских автомобилей в странах Европейского Союза. Все необходимые документы и процедуры.',
    image: '/images/blog/eu-registration.jpg',
    date: '2023-12-28',
    readTime: '7 мин',
    category: 'Документы',
    author: 'Анна Козлова'
  },
  {
    id: 6,
    title: 'Встреча владельцев советских автомобилей в Берлине',
    excerpt: 'Отчет о ежегодной встрече энтузиастов советских автомобилей в Берлине. Фотографии, истории владельцев и планы на будущее.',
    image: '/images/blog/berlin-meetup.jpg',
    date: '2023-12-20',
    readTime: '5 мин',
    category: 'События',
    author: 'Дмитрий Волков'
  }
];

const categories = ['Все', 'История', 'Советы', 'Реставрация', 'Коллекционирование', 'Документы', 'События'];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const filteredPosts = selectedCategory === 'Все' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <>
      <Head>
        <title>Блог - RetroCars | Новости и статьи о советских автомобилях</title>
        <meta name="description" content="Читайте интересные статьи о советских ретро автомобилях, истории автопрома, советы по реставрации и коллекционированию." />
        <meta name="keywords" content="блог, статьи, советские автомобили, история, реставрация, коллекционирование, Москвич, Волга, Жигули" />
        <meta property="og:title" content="Блог - RetroCars" />
        <meta property="og:description" content="Новости и статьи о советских автомобилях" />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Блог <span className="text-red-600">RetroCars</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Узнавайте больше о советских ретро автомобилях, истории автопрома, 
              советах по реставрации и коллекционированию
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48 bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Изображение: {post.title}</span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                    <span className="mx-2">•</span>
                    <span>{post.author}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <Link 
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
                  >
                    Читать далее
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 bg-red-600 rounded-xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Подпишитесь на новости</h2>
            <p className="text-xl mb-6">
              Получайте свежие статьи и новости о советских автомобилях прямо на почту
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Ваш email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-600"
              />
              <button className="bg-white text-red-600 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                Подписаться
              </button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
