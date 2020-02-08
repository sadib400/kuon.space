module.exports = {
  watch: true,
  mode: "production",
  entry: "./src/js/index.js",
  output: {
    filename: "main.js"
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