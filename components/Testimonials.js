import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Михаил Шмидт',
    location: 'Берлин, Германия',
    car: 'Волга ГАЗ 21',
    rating: 5,
    text: 'Отличный сервис! Нашел именно то, что искал. Автомобиль в идеальном состоянии, как и было обещано. Рекомендую всем любителям советских автомобилей.',
    date: '2024-01-15'
  },
  {
    id: 2,
    name: 'Анна Ван Дер Берг',
    location: 'Амстердам, Нидерланды',
    car: 'Москвич 412',
    rating: 5,
    text: 'Очень довольна покупкой! Команда RetroCars помогла с оформлением всех документов и доставкой. Профессиональный подход к делу.',
    date: '2024-01-08'
  },
  {
    id: 3,
    name: 'Пьер Дюбуа',
    location: 'Париж, Франция',
    car: 'Жигули 2101',
    rating: 4,
    text: 'Хороший выбор автомобилей, честные цены. Машина приехала в срок, все работает отлично. Спасибо за качественный сервис!',
    date: '2023-12-20'
  },
  {
    id: 4,
    name: 'Карлос Родригес',
    location: 'Мадрид, Испания',
    car: 'УАЗ 469',
    rating: 5,
    text: 'Мечтал о таком внедорожнике с детства! RetroCars помогли воплотить мечту в реальность. Отличная работа команды!',
    date: '2023-12-10'
  },
  {
    id: 5,
    name: 'Люк Ван Ден Брук',
    location: 'Брюссель, Бельгия',
    car: 'Лада 2103',
    rating: 5,
    text: 'Покупал уже второй автомобиль у этих ребят. Всегда честно рассказывают о состоянии машины. Очень рекомендую!',
    date: '2023-11-28'
  },
  {
    id: 6,
    name: 'Франц Мюллер',
    location: 'Цюрих, Швейцария',
    car: 'ЗАЗ 968М',
    rating: 4,
    text: 'Интересная коллекция редких автомобилей. Помогли с реставрацией и оформлением документов. Доволен результатом!',
    date: '2023-11-15'
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useState(() => {
    if (isAutoPlay) {
      const interval = setInterval(nextTestimonial, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, currentIndex]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Отзывы наших <span className="text-red-600">клиентов</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Узнайте, что говорят наши довольные клиенты о покупке советских ретро автомобилей
          </p>
        </div>

        <div className="relative">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                {renderStars(testimonials[currentIndex].rating)}
              </div>
              <blockquote className="text-lg text-gray-700 italic mb-6">
                "{testimonials[currentIndex].text}"
              </blockquote>
              <div className="text-center">
                <p className="font-semibold text-gray-900">{testimonials[currentIndex].name}</p>
                <p className="text-gray-600">{testimonials[currentIndex].location}</p>
                <p className="text-sm text-red-600 font-medium">
                  Купил: {testimonials[currentIndex].car}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(testimonials[currentIndex].date).toLocaleDateString('ru-RU')}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentIndex ? 'bg-red-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Auto-play toggle */}
          <div className="text-center mt-4">
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`text-sm px-4 py-2 rounded-lg transition-colors duration-200 ${
                isAutoPlay 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {isAutoPlay ? '⏸️ Пауза' : '▶️ Автопрокрутка'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
