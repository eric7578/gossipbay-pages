const ghPages = process.env.DEPLOY_HOST === 'gh-pages';

module.exports = {
  assetPrefix: ghPages ? '/gossipbay-pages/' : '',
};
