/** @type {import('next').NextConfig} */

const nextConfig = {
    images: { unoptimized: true },
    // webpack: (config) => {
    //   config.module.rules.push({
    //     test: /\.(woff|woff2|eot|ttf|otf)$/,
    //     use: {
    //       loader: 'file-loader',
    //       options: {
    //         name: '[name].[ext]',
    //         outputPath: 'static/fonts/',
    //         publicPath: '/_next/static/fonts/',
    //         esModule: false,
    //       },
    //     },
    //   });
  
    //   return config;
    // },
  };
  
  export default nextConfig;