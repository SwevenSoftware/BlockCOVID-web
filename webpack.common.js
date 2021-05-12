const path = require('path')

module.exports = {
    entry: {
        app: './src/index.tsx',
    },

    module: {
        rules: [
            {
                test: path.join(__dirname, 'src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/
            }

        ],
    }, resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.css'],
    },
    output: {
        filename: 'blockcovid.bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
