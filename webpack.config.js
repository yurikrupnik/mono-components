const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const pkg = require(path.resolve(process.cwd(), 'package.json'));

module.exports = (env) => {
    const isProd = env ? !!env.prod : false;
    const isDebug = env ? !!env.debug : false;

    // console.log('env', env);

    // console.log('', );
    // console.log('path.resolve(__dirname)', path.join(__dirname));
    // console.log('path.join(__dirname)', path.join(process.cwd(), 'lib'));
    // console.log('path.resolve(__dirname)', path.resolve(process.cwd(), 'lib'));
    console.log('isProd', isProd);

    return {
        context: path.resolve(process.cwd(), 'lib'),
        // context: path.resolve(__dirname, 'packages', 'BaseButton', 'lib'),
        externals: {
            react: 'react',
            'react-dom': 'react-dom',
            'prop-types': 'prop-types',
            '@material-ui/core/Button': '@material-ui/core/Button',
            'styled-components': 'styled-components'

        },
        optimization: {
            minimizer: [
                // new TerserPlugin(),
                new OptimizeCSSAssetsPlugin({})
            ]
        },
        target: 'web',
        resolve: {
            extensions: ['.json', '.js', '.jsx', '.css', '.scss', '.vue'],
            alias: {
                BaseButton: path.resolve(__dirname, 'packages/BaseButton/index.js'),
                ButtonGroup: path.resolve(__dirname, 'packages/ButtonGroup/index.js'),
                PillButton: path.resolve(__dirname, 'packages/PillButton/index.js'),
                // Templates: path.resolve(__dirname, 'src/templates/')
            }
            // alias: {
            //     vue: 'vue/dist/vue.js'
            // }
        },
        devtool: isProd ? 'source-map' : 'eval-cheap-module-source-map',
        entry: './index.js',
        output: {
            filename: '[name].js',
            chunkFilename: '[name].js',
            path: path.resolve(process.cwd(), 'webDist'),
            publicPath: '/',
            library: pkg.name,
            libraryTarget: 'umd'
        },
        mode: isProd ? 'production' : 'development',
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            rootMode: 'upward',
                        }
                    },
                    exclude: /node_modules/,
                },
                {
                    test: /\.(css|scss)$/,
                    use: [
                        'css-hot-loader',
                        !isProd ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: isProd ? '[hash:base64]' : '[local]--[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ],
                },
                // {
                //     test: /\.ejs$/,
                //     use: 'raw-loader'
                // },
                // {
                //     test: /\.(png|jpg|gif)$/,
                //     use: [
                //         {
                //             loader: 'file-loader',
                //             options: {}
                //         }
                //     ]
                // }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.DEBUG': JSON.stringify(isDebug),
                'process.env.PORT': JSON.stringify(process.env.PORT)
            }),
            // new HtmlWebpackPlugin({
            //     template: 'index.ejs',
            //     filename: 'index.html',
            //     favicon: 'assets/favicon.ico',
            //     meta: {
            //         charset: 'UTF-8',
            //         viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
            //     },
            //     minify: {
            //         removeComments: true,
            //         collapseWhitespace: true,
            //         conservativeCollapse: true
            //     }
            // }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: !isProd ? '[name].css' : '[name].[hash].css',
                chunkFilename: !isProd ? '[id].css' : '[id].[hash].css',
            }),
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                openAnalyzer: false,
                reportFilename: 'bundles-report/index.html'
            }),
            // new VueLoaderPlugin(),
            // process.env.NODE_ENV_DOCKER ? new BundleAnalyzerPlugin({
            //     analyzerMode: 'static',
            //     openAnalyzer: false
            // }) :
            // new BundleAnalyzerPlugin({})
        ],
        devServer: { // when not prod - NODE_ENV_DOCKER taken from docker-compose env
            // port: config.port + 1,
            open: true,
            host: process.env.NODE_ENV_DOCKER ? '0.0.0.0' : 'localhost',
            index: 'index.html',
            historyApiFallback: true
        }
    };
};
