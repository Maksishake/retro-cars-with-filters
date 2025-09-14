export default function StatsSection() {
  const stats = [
    {
      number: '500+',
      label: 'Автомобилей продано',
      icon: '🚗',
      color: 'from-red-500 to-red-600'
    },
    {
      number: '15+',
      label: 'Лет опыта',
      icon: '⭐',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      number: '25+',
      label: 'Стран доставки',
      icon: '🌍',
      color: 'from-blue-500 to-blue-600'
    },
    {
      number: '98%',
      label: 'Довольных клиентов',
      icon: '😊',
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Почему выбирают нас?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Мы специализируемся на продаже и реставрации советских ретро автомобилей 
            с более чем 15-летним опытом работы в Европе
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-3xl shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                {stat.number}
              </div>
              <div className="text-lg text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-2xl text-white">
              🔧
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Полная реставрация</h3>
            <p className="text-gray-600">
              Профессиональная реставрация автомобилей с использованием оригинальных запчастей
            </p>
          </div>

          <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-2xl text-white">
              📋
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Оформление документов</h3>
            <p className="text-gray-600">
              Помогаем с регистрацией и оформлением всех необходимых документов
            </p>
          </div>

          <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-2xl text-white">
              🚚
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Доставка по Европе</h3>
            <p className="text-gray-600">
              Безопасная доставка автомобилей в любую точку Европы
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
