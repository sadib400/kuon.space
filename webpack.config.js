const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: {
    app: [
      './src/js/index.js',
      './src/css/index.scss',
    ],
  },
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist/asset`,
    // 出力ファイル名
    filename: 'js/[name].js',
    publicPath: '/',
  },
  devServer: {
    contentBase: path.join(__dirname, './dist/asset'),
    watchContentBase: true,
    host: "0.0.0.0",
    open: true,
    port: 8081,
    useLocalIp: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use:
          [
            // CSSファイルを書き出すオプションを有効にする
            {
              loader: MiniCssExtractPlugin.loader,
            },
            // CSSをバンドルするための機能
            {
              loader: 'css-loader',
              options: {
                // オプションでCSS内のurl()メソッドの取り込みを禁止する
                url: false,
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
      },
    ],
  },
  plugins: [
    // CSSファイルを外だしにするプラグイン
    new MiniCssExtractPlugin({
      // ファイル名を設定します
      filename: 'css/style.css',
    }),
  ],
};
