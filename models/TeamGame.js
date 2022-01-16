const keystone = require('keystone');
const Types = keystone.Field.Types;
const utils = keystone.utils;

const TeamGame = new keystone.List('TeamGame');

TeamGame.add({
  game: { type: Types.Relationship, ref: 'Game', many: false, index: true },
  team: { type: Types.Relationship, ref: 'Team', many: false, index: true },
  scheduledType: { type: Types.Select, options: 'home, visitor', default: 'home', index: true },
  score: { type: Types.Number },
  eventOutcome: { type: Types.Select, options: 'future, tie, won, lost', default: 'future', index: true },
});

//TeamGame.schema.virtual('').get(function () {
//  return;
//});

TeamGame.defaultSort = '-createdAt';
TeamGame.defaultColumns = 'game, team, scheduledType, eventOutcome';
TeamGame.register();