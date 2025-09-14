import Link from 'next/link';

export default function NewsSection() {
  const news = [
    {
      id: 1,
      title: 'Новая коллекция Москвичей 1970-х годов',
      excerpt: 'В нашем каталоге появились редкие экземпляры Москвич 412 и 2140 в отличном состоянии',
      date: '2024-01-15',
      category: 'Новинки',
      image: '/images/moskvich-412.svg',
      readTime: '3 мин'
    },
    {
      id: 2,
      title: 'Реставрация Волги ГАЗ-21: процесс и результат',
      excerpt: 'Подробный рассказ о том, как мы восстанавливали легендарную Волгу 1965 года',
      date: '2024-01-10',
      category: 'Реставрация',
      image: '/images/volga-gaz21.svg',
      readTime: '5 мин'
    },
    {
      id: 3,
      title: 'Выставка советских автомобилей в Берлине',
      excerpt: 'Приглашаем на выставку классических советских автомобилей 25-28 января',
      date: '2024-01-08',
      category: 'События',
      image: '/images/zhiguli-2101.svg',
      readTime: '2 мин'
    }
  ];

  const categories = ['Все', 'Новинки', 'Реставрация', 'События', 'Советы', 'История'];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Последние новости
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Следите за новостями из мира советских ретро автомобилей
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                category === 'Все'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((article) => (
            <article key={article.id} className="card group hover:scale-105 transition-transform duration-300">
              <div className="relative h-48 overflow-hidden rounded-t-2xl">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {article.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                    {article.readTime}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>{new Date(article.date).toLocaleDateString('ru-RU')}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-200">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <Link
                  href={`/blog/${article.id}`}
                  className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold transition-colors duration-200"
                >
                  Читать далее
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="btn-primary inline-flex items-center"
          >
            Все новости
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
