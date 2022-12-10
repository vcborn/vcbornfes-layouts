import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Configuration } from 'webpack';

const NODE_ENV =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

const createBrowserConfig = (
  type: 'dashboard' | 'graphics',
  name: string
): Configuration => ({
  mode: NODE_ENV,
  entry: resolve(__dirname, 'src', type, name, 'index.tsx'),
  output: {
    path: resolve(__dirname, type),
    filename: `${name}.js`
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: require('os').cpus().length - 1
            }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: true
            }
          },
        ]
      },
      {
        test: /\.css/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { url: false }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src', type, name, 'index.html'),
      filename: `${name}.html`
    })
  ],
  externals: ['nodecg'],
  devtool: NODE_ENV === 'development' ? 'inline-source-map' : void 0
});

const config: Configuration[] = [
  createBrowserConfig('dashboard', 'main'),
  createBrowserConfig('dashboard', 'ad'),
  createBrowserConfig('dashboard', 'next'),
  createBrowserConfig('dashboard', 'deck'),
  createBrowserConfig('graphics', 'main'),
  createBrowserConfig('graphics', 'waiting')
];
export default config;