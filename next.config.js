/** @type {import('next').NextConfig} */
const webpack = require("webpack")

const nextConfig = {
  api: { bodyParser: false, },
  
  env: {
    API_URL: process.env.API_URL
  },

  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    );
    return config;
  }
  
}

module.exports = nextConfig
