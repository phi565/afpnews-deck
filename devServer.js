require('dotenv').config()

module.exports = {
  port: 8080,
  host: 'localhost',
  rules: [{
    slug: 'auth',
    pathname: '/auth',
    method: ['POST'],
    dest: 'auth.localhost',
    run: 'npm run dev',
    cwd: './auth',
    env: {
      AFPNEWS_DECK_AUTHORIZATION: process.env.AFPNEWS_DECK_AUTHORIZATION
    },
    debug: false
  }, {
    slug: 'ui',
    pathname: '/',
    dest: 'localhost',
    method: ['GET'],
    run: 'npm run serve:app',
    debug: true,
    startTimeout: 10000
  }]
}
