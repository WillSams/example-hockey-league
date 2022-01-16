const keystone = require('keystone');
const Types = keystone.Field.Types;
const utils = keystone.utils;

const PlayerGameOffensiveStatSheet = new keystone.List('PlayerGameOffensiveStatSheet');

PlayerGameOffensiveStatSheet.add({
  player: { type: Types.Relationship, ref: 'Player', many: false, index: true },
  game: { type: Types.Relationship, ref: 'Game', many: false, index: true },
  team: { type: Types.Relationship, ref: 'Team', many: false, index: true },
  goals: { type: Types.Number, default: 0 },
  assists: { type: Types.Number, default: 0 },
  pim: { type: Types.Number, default: 0 },
  powerPlayGoals: { type: Types.Number, default: 0 },
  powerPlayAssists: { type: Types.Number, default: 0 },
  shortHandedGoals: { type: Types.Number, default: 0 },
  shortHandedAssists: { type: Types.Number, default: 0 },
  shots: { type: Types.Number, default: 0 },
});

PlayerGameOffensiveStatSheet.schema.virtual('shootingPercentage').get(function () {
  if (!+this.goals || !this.shots) return 0.0;

  return ((this.goals / this.shots) / 100) * 10000;
});

PlayerGameOffensiveStatSheet.schema.virtual('points').get(function () {
  return this.goals + this.assists;
});

PlayerGameOffensiveStatSheet.schema.virtual('powerPlayPoints').get(function () {
  return this.powerPlayGoals + this.powerPlayAssists;
});

PlayerGameOffensiveStatSheet.schema.virtual('shortHandedPoints').get(function () {
  return this.shortHandedGoals + this.shortHandedAssists;
});

PlayerGameOffensiveStatSheet.defaultSort = '-createdAt';
PlayerGameOffensiveStatSheet.defaultColumns = 'player, player.position, game, team, goals, assists';
PlayerGameOffensiveStatSheet.register();