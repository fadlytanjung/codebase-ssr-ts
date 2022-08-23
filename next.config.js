const path = require('path');

module.exports = () => {
  return {
    eslint: {
      dirs: ['src/pages', 'src/components'], // Only run ESLint on the 'pages' and 'components' directories during production builds (next build)
    },
    sassOptions: {
      includePaths: [path.join(__dirname, 'src/styles')],
    },
  };
}