import { useState } from 'react';
import Image from 'next/image';

export default function ImageGallery({ images, carName }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setSelectedImage(index);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-500">Изображения не найдены</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        {/* Main Image */}
        <div className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden bg-gray-100 group">
          <Image
            src={images[selectedImage]}
            alt={`${carName} - изображение ${selectedImage + 1}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            priority
          />
          
          {/* Overlay with controls */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <button
              onClick={openFullscreen}
              className="opacity-0 group-hover:opacity-100 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full font-medium transition-all duration-300 hover:bg-white hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              Полноэкранный режим
            </button>
          </div>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-2 rounded-full hover:bg-white transition-all duration-200 hover:scale-110"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-2 rounded-full hover:bg-white transition-all duration-200 hover:scale-110"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Image counter */}
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
            {selectedImage + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnail Gallery */}
        {images.length > 1 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`relative w-full h-20 md:h-24 rounded-lg overflow-hidden transition-all duration-200 ${
                  selectedImage === index
                    ? 'ring-2 ring-red-500 scale-105'
                    : 'hover:scale-105 hover:ring-2 hover:ring-red-300'
                }`}
              >
                <Image
                  src={image}
                  alt={`${carName} - миниатюра ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                />
                {selectedImage === index && (
                  <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full h-full max-w-7xl max-h-full">
            {/* Close button */}
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm text-gray-800 p-2 rounded-full hover:bg-white transition-all duration-200 hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Fullscreen image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={images[selectedImage]}
                alt={`${carName} - полноэкранное изображение ${selectedImage + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Navigation arrows in fullscreen */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full hover:bg-white transition-all duration-200 hover:scale-110"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full hover:bg-white transition-all duration-200 hover:scale-110"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Image counter in fullscreen */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-lg font-medium">
              {selectedImage + 1} / {images.length}
            </div>

            {/* Thumbnail strip in fullscreen */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-4xl overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`relative w-16 h-12 rounded-lg overflow-hidden transition-all duration-200 flex-shrink-0 ${
                    selectedImage === index
                      ? 'ring-2 ring-white scale-110'
                      : 'hover:scale-105 hover:ring-2 hover:ring-white/50'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${carName} - миниатюра ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
