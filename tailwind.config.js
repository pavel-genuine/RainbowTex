
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      // 'primary': '#000040', //navy
      // 'primary': '#10a310', //green
      // 'primary': '#ff4500', //orange
      // 'primary': 'black',
      // 'primary': '#020267',//navy
      // 'primary': '#5c0931', //qatar
      // 'primary': '#8d0434', //qatar-light
      'primary': '#8e2158', //qatar-light2
    }
  },
  plugins: [],
  corePlugins: {
    // preflight: false,
  }
});

