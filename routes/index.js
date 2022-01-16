const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);

keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

const routes = { views: importRoutes('./views'), };

module.exports = app => {
  app.get('/', routes.views.index);
  app.get('/about', routes.views.about);
  app.all('/commitments', routes.views.commitments);
  app.all('/contact', routes.views.contact);
  app.all('/news', routes.views.news);
  app.all('/partners', routes.views.partners);
  app.get('/privacy', routes.views.privacy);
  app.all('/staff', routes.views.staff);
  app.get('/terms', routes.views.terms);
  app.get('/stats/goalies', routes.views.stats.goalies);
  app.get('/stats/skaters', routes.views.stats.skaters);
  app.get('/stats/teams', routes.views.stats.teams);
  app.get('/schools/:team', routes.views.schools.juco);

  app.use((req, res) => { res.status(404).render('errors/404'); });
  app.use((req, res) => { res.status(500).render('errors/500'); });
};
