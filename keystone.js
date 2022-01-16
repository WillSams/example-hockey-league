
const keystone = require('keystone');

keystone.init({
  'name': 'South East Junior College Hockey League',
  'brand': 'South East Junior College Hockey League',

  'static': 'public',
  'favicon': 'public/images/favicon.ico',

  'views': 'views',
  'view engine': 'pug',
  'emails': 'views/emails',

  'auto update': true,

  'cookie secret': process.env.COOKIE_SECRET,
  'session': true,
  'session store': 'mongo',
  'cookie signin options': { 'maxAge': 480 * 60 * 1000 }, //8 hours

  'auth': true,
  'user model': 'User',
});

// Load your project's Models
keystone.import('models');

keystone.set('locals', {
  _: require('lodash'),
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable,
});

keystone.set('routes', require('./routes'));    // Load your project's Routes

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
  users: 'users',
  posts: ['posts', 'post-categories'],
  inquiries: 'inquiries',
  seasons: 'seasons',
  tournaments: ['tournaments', 'tournament-types', 'teams'],
  players: 'players',
  games: 'games',
  seasons: ['seasons'],
  teams: ['teams'],
  teamGames: ['team-games'],
  //periods: 'periods',
  sites: 'sites',
  //gameStates: ['game-states', 'current-state-types'],
  playerGameDefensiveStatSheets: 'player-game-defensive-stat-sheets',
  playerGameOffensiveStatSheets: 'player-game-offensive-stat-sheets',
});

keystone.start();
