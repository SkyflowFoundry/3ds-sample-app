const path = require("path");

module.exports = {
  root: path.resolve(__dirname, "../"),
  outputPath: path.resolve(__dirname, "../", "build","3ds"),
  entryPath: path.resolve(__dirname, "../", "src/index.js"),
  templatePath: path.resolve(__dirname, "../", "public/index.html"),
  faviconPath: path.resolve(__dirname, "../", "public/skyflow-logo-new.png"),
  devImagesFolder: "images",
  prodImagesFolder:"/images",
  fontsFolder: "fonts",
  cssFolder: "css",
  jsFolder: "js",
};
