const keystone = require('keystone');
const Types = keystone.Field.Types;
const utils = keystone.utils;

const PlayerGameDefensiveStatSheet = new keystone.List('PlayerGameDefensiveStatSheet');

PlayerGameDefensiveStatSheet.add({
  player: { type: Types.Relationship, ref: 'Player', many: false, index: true },
  game: { type: Types.Relationship, ref: 'Game', many: false, index: true },
  team: { type: Types.Relationship, ref: 'Team', many: false, index: true },
  saves: { type: Types.Number, default: 0 },
  shotsOn: { type: Types.Number, default: 0 },
  shotsBlock: { type: Types.Number, default: 0 },
  shutout: { type: Types.Number, default: 0 },
  hits: { type: Types.Number, default: 0 },
  faceoffsWon: { type: Types.Number, default: 0 },
  goalieMinutesOnIce: { type: Types.Number, default: 0.0 },
  goalieMinutesOffIce: { type: Types.Number, default: 0.0 },
});

PlayerGameDefensiveStatSheet.schema.virtual('savePercentage').get(function () {
  if (!+this.saves || !this.shotsOn) return 0.0;

  return this.saves / this.shotsOn;
});

PlayerGameDefensiveStatSheet.defaultSort = '-createdAt';
PlayerGameDefensiveStatSheet.defaultColumns = 'player, player.position, game, team';
PlayerGameDefensiveStatSheet.register();