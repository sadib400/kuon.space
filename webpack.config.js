module.exports = {
  watch: true,
  mode: "production",
  entry: {
    index: "./src/js/index.js"
  },
  output: {
    filename: "[name].js",
    path: __dirname + '/asset/js'
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
              presets: [
                ['@babel/preset-env', { modules: false }]
              ]
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: "./",
    open: true
  }
}