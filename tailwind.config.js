
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      // 'primary': '#000040', //navy
      'primary': '#10a310', //green
      // 'primary': '#ff4500', //orange
      // 'primary': 'black',
    }
  },
  plugins: [],
  corePlugins: {
    // preflight: false,
  }
});

