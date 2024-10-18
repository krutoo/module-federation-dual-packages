import fs from 'node:fs/promises';
import webpack from 'webpack';

const { dependencies } = JSON.parse(await fs.readFile('./package.json'));

export default {
  mode: 'development',
  output: {
    library: 'Child',
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: {
            sourceMap: true,
            jsc: {
              parser: {
                syntax: 'typescript',
                jsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
            },
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new webpack.container.ModuleFederationPlugin({
      name: 'child',
      filename: 'remote-entry.js',
      exposes: {
        './App': './src/index.tsx',
      },
      shared: {
        ...dependencies,
        react: {
          requiredVersion: dependencies.react,
          singleton: true,
        },
        'react-dom': {
          requiredVersion: dependencies['react-dom'],
          singleton: true,
        },
      },
    }),
    new webpack.DefinePlugin({
      'import.meta.env.SENTRY_DSN': JSON.stringify(process.env.SENTRY_DSN),
      'import.meta.env.SENTRY_RELEASE': JSON.stringify(process.env.SENTRY_RELEASE),
      'import.meta.env.SENTRY_ENVIRONMENT': JSON.stringify(process.env.SENTRY_ENVIRONMENT),
    }),
  ],
  devServer: {
    port: 8400,
  },
};
