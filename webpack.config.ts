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
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
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

const config: Configuration[] = [createBrowserConfig('dashboard', 'main'), createBrowserConfig('graphics', 'main')];
export default config;