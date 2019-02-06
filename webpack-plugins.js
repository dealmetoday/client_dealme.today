const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
/* Import webpack-manifest-plugin */
const ManifestPlugin = require('webpack-manifest-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

exports.loaderOptions = new webpack.LoaderOptionsPlugin({
    options: {
        context: __dirname,
    },
});

exports.environmentVariables = new webpack.DefinePlugin({
    'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    },
});

exports.uglifyJs = new webpack.optimize.UglifyJsPlugin({
    output: {
        comments: false,
    },
    compress: {
        warnings: false,
        drop_console: true,
    },
});

exports.extractText = (() => {
    const config = {
        filename:  'style.css',
    };
    return new ExtractTextPlugin(config);
})();

/* The basic is very easy, just define the file name and
 * it's gonna be created in the public folder along with the assets
 */
exports.manifest = new ManifestPlugin({
    fileName: 'asset-manifest.json', // Not to confuse with manifest.json
});

exports.sw = new SWPrecacheWebpackPlugin({
    // By default, a cache-busting query parameter is appended to requests
    // used to populate the caches, to ensure the responses are fresh.
    // If a URL is already hashed by Webpack, then there is no concern
    // about it being stale, and the cache-busting can be skipped.
    dontCacheBustUrlsMatching: /\.\w{8}\./,
    filename: 'service-worker.js',
    logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
            // This message occurs for every build and is a bit too noisy.
            return;
        }
        console.log(message);
    },
    minify: true, // minify and uglify the script
    navigateFallback: '/index.html',
    staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
});

// Export copy-webpack-plugin instance
exports.copy = new CopyWebpackPlugin([
    { from: './src/pwa' }, // define the path of the files to be copied
]);
