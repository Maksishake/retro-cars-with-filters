import { useState, useRef } from 'react';

export default function ImageUpload({ onImagesChange, existingImages = [] }) {
  const [images, setImages] = useState(existingImages);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = (files) => {
    const newImages = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      file: file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      type: file.type
    }));
    
    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const removeImage = (imageId) => {
    const updatedImages = images.filter(img => img.id !== imageId);
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
          dragActive
            ? 'border-red-500 bg-red-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-2">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          
          <div className="text-sm text-gray-600">
            <span className="font-medium text-red-600 hover:text-red-500 cursor-pointer">
              Нажмите для загрузки
            </span>
            {' '}или перетащите изображения сюда
          </div>
          
          <p className="text-xs text-gray-500">
            PNG, JPG, GIF до 10MB каждое
          </p>
        </div>
      </div>

      {/* Image Preview */}
      {images.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900">
            Загруженные изображения ({images.length})
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                
                {/* Image Info */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <div className="text-center text-white p-2">
                    <p className="text-xs font-medium truncate">{image.name}</p>
                    <p className="text-xs">{formatFileSize(image.size)}</p>
                  </div>
                </div>
                
                {/* Remove Button */}
                <button
                  onClick={() => removeImage(image.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors duration-200"
                >
                  ×
                </button>
                
                {/* Main Image Indicator */}
                {images.indexOf(image) === 0 && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    Главное
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Советы по загрузке:</h4>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Первое изображение будет использоваться как главное</li>
          <li>• Рекомендуется загружать изображения высокого качества</li>
          <li>• Поддерживаются форматы: JPG, PNG, GIF, WebP</li>
          <li>• Максимальный размер файла: 10MB</li>
        </ul>
      </div>
    </div>
  );
}
