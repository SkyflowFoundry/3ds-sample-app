module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        targets: {
          esmodules: true,
        },
        useBuiltIns: "usage",
        corejs: 3,
      },
    ],
    "@babel/preset-react",
  ];
  const plugins = [
    "@babel/transform-react-constant-elements",
    "@babel/transform-react-inline-elements",
    "transform-react-remove-prop-types",
    "transform-react-pure-class-to-function",
    ["@babel/plugin-transform-runtime", { regenerator: true, corejs: 3 }],
    "react-hot-loader/babel",

    // Stage 2 https://github.com/babel/babel/tree/master/packages/babel-preset-stage-2
  ];
  
  

  return {
    presets,
    plugins
  };
};
