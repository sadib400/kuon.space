module.exports = {
  watch: true,
  mode: "production",
  entry: {
    top: "./src/js/top.js",
    about: "./src/js/about.js",
    index: "./src/js/index.js"
  },
  output: {
    filename: "[name].js",
    path: __dirname + '/dist/asset/js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,// ローダーの処理対象から外すディレクトリ
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { modules: false }]]
            }
          }
        ]
      }
    ]
  }
}