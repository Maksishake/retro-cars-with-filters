export default function TechnicalSpecs({ specs }) {
  if (!specs) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Технические характеристики</h3>
        <p className="text-gray-600">Характеристики не указаны</p>
      </div>
    );
  }

  const SpecSection = ({ title, data, icon }) => (
    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 hover:bg-white/70 transition-all duration-300">
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
          <span className="text-lg">{icon}</span>
        </div>
        <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
      </div>
      <div className="space-y-2">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-b-0">
            <span className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
            <span className="text-sm font-medium text-gray-900">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <svg className="w-6 h-6 mr-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Технические характеристики
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {specs.engine && (
          <SpecSection 
            title="Двигатель" 
            data={specs.engine} 
            icon="🔧" 
          />
        )}
        
        {specs.dimensions && (
          <SpecSection 
            title="Размеры" 
            data={specs.dimensions} 
            icon="📏" 
          />
        )}
        
        {specs.performance && (
          <SpecSection 
            title="Характеристики" 
            data={specs.performance} 
            icon="⚡" 
          />
        )}
        
        {specs.transmission && (
          <SpecSection 
            title="Трансмиссия" 
            data={specs.transmission} 
            icon="⚙️" 
          />
        )}
        
        {specs.suspension && (
          <SpecSection 
            title="Подвеска и тормоза" 
            data={specs.suspension} 
            icon="🚗" 
          />
        )}
      </div>
    </div>
  );
}
