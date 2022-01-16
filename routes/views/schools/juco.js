const keystone = require('keystone');

const Team = keystone.list('Team');
const Player = keystone.list('Player');

module.exports = function (req, res) {
  const view = new keystone.View(req, res);
  const locals = res.locals;

  const getPlayersByPosition = function (position) {
    return Player.model.find({ 'position': position }).where('_id').in(locals.data.team);
  };

  // Init locals
  locals.section = 'juco';
  locals.filters = { team: req.params.team, };
  locals.data = {
    team: [], goalies: [], forwards: [], defensemen: [], goaliestats: [], skaterstats: []
  };

  //load the players in the team
  view.on('init', function (next) {
    const team = Team.model.find({ 'abbreviation': locals.filters.team });
    team.exec(function (err, result) { locals.data.team = result[0].players; next(err); });
  });

  view.on('init', function (next) {
    const goalies = getPlayersByPosition('G');
    goalies.exec(function (err, result) { locals.data.goalies = result; next(err); });
  });

  view.on('init', function (next) {
    const forwards = getPlayersByPosition('F');
    forwards.exec(function (err, result) { locals.data.forwards = result; next(err); });
  });

  view.on('init', function (next) {
    const defensemen = getPlayersByPosition('D');
    defensemen.exec(function (err, result) { locals.data.defensemen = result; next(err); });
  });

  /*// load the skater stats TODO:  drop the idea of loading new tables...use existing tables for cumulative per season 
  view.on('init', function(next) {
    const q = keystone.list('StatsSkatersSeason').model.find().where('isVisible').equals(true).sort('-createdDate');
    q.exec(function(err, results) { locals.data.skaterstats = results; next(err); });
  });*/

  view.render('schools/juco');
};

