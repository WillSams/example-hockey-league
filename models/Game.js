const keystone = require('keystone');
const Types = keystone.Field.Types;
const utils = keystone.utils;

const Game = new keystone.List('Game', { autokey: { from: 'name', path: 'key', unique: true } });

Game.add({
  name: { type: String, required: true, index: true, initial: false },
  site: { type: Types.Relationship, ref: 'Site', many: false, index: true },
  tournament: { type: Types.Relationship, ref: 'Tournament', many: false, index: true },
  teams: { type: Types.Relationship, ref: 'Team', many: true, index: true },
  startDate: { type: Types.Date, required: true, index: true, initial: false },
  gameStatus: { type: Types.Select, options: 'upcoming, pre-game, in progress, completed', default: 'upcoming', index: true, required: true },
  attendance: { type: Types.Number },
  //gameLog:
  startTime: { type: String },
  endTime: { type: String },
});

//Game.schema.virtual('name').get(function () {
// return gameId;
//});

Game.schema.virtual('duration').get(function () {
  return; //endTime - startTime;
});

Game.schema.virtual('lastUpdated').get(function () {
  return updatedAt;
});

Game.defaultSort = '-createdAt';
Game.relationship({ ref: 'TeamGame', path: 'game', refPath: 'game' });
Game.relationship({ ref: 'PlayerGameDefensiveStatSheet', path: 'game', refPath: 'game' });
Game.relationship({ ref: 'PlayerGameOffensiveStatSheet', path: 'game', refPath: 'game' });
Game.defaultColumns = 'name, site, tournament, teams, startDate';
Game.register();