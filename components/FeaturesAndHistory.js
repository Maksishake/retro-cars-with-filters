export default function FeaturesAndHistory({ car }) {
  const { specialFeatures, history, restoration } = car;

  return (
    <div className="space-y-6">
      {/* Special Features */}
      {specialFeatures && specialFeatures.length > 0 && (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Особенности
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {specialFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-white/50 rounded-lg hover:bg-white/70 transition-all duration-200">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* History */}
      {history && (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            История автомобиля
          </h3>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed">{history}</p>
          </div>
        </div>
      )}

      {/* Restoration */}
      {restoration && (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            Реставрация
          </h3>
          
          <div className="space-y-4">
            {restoration.year && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-red-600 font-bold">📅</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Год реставрации:</span>
                  <span className="ml-2 font-semibold text-gray-900">{restoration.year}</span>
                </div>
              </div>
            )}

            {restoration.cost && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold">💰</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Стоимость реставрации:</span>
                  <span className="ml-2 font-semibold text-gray-900">{restoration.cost}</span>
                </div>
              </div>
            )}

            {restoration.work && restoration.work.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Выполненные работы:</h4>
                <div className="space-y-2">
                  {restoration.work.map((work, index) => (
                    <div key={index} className="flex items-start space-x-3 p-2 bg-white/50 rounded-lg">
                      <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{work}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
