// Объект настроек по умолчанию
const defaultOptions = {
  mozjpeg: {
    progressive: true,
    quality: 65
  },
  optipng: {
    enabled: false,
  },
  pngquant: {
    quality: [0.65, 0.90],
    speed: 4
  },
  gifsicle: {
    interlaced: false,
  },
  webp: {
    quality: 75
  },
  svgo: {}
};

/**
 * @description
 * @param options
 * @returns {{loader: string, options: {mozjpeg: {progressive: boolean, quality: number}, optipng: {enabled: boolean}, pngquant: {quality: number[], speed: number}, gifsicle: {interlaced: boolean}, webp: {quality: number}}}}
 */
module.exports = (options = defaultOptions) => {
  return {
    loader: 'image-webpack-loader',
    options
  }
};
