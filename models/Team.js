const keystone = require('keystone');
const Types = keystone.Field.Types;
const utils = keystone.utils;

const Team = new keystone.List('Team', { autokey: { from: 'teamId', path: 'key', unique: true } });

Team.add({
  teamId: { type: Types.Number, required: true, index: true, unique: true, initial: false },
  name: { type: String, required: true, unique: true, index: true, initial: false },
  abbreviation: { type: String, required: true, unique: true, initial: false },
  establishedDateTime: { type: Types.Date },
  foldedDateTime: { type: Types.Date, default: null },
  players: { type: Types.Relationship, ref: 'Player', many: true, index: true, initial: false },
  homeSite: { type: Types.Relationship, ref: 'Site', many: false, index: true, initial: false }
});

Team.defaultSort = '-createdAt';
Team.relationship({ ref: 'Tournament', path: 'teams', refPath: 'teams' });
Team.relationship({ ref: 'Game', path: 'teams', refPath: 'teams' });
Team.relationship({ ref: 'TeamGame', path: 'team', refPath: 'team' });
Team.relationship({ ref: 'PlayerGameDefensiveStatSheet', path: 'team', refPath: 'team' });
Team.relationship({ ref: 'PlayerGameOffensiveStatSheet', path: 'team', refPath: 'team' });
Team.defaultColumns = 'name, abbreviation, establishedDateTime, homeSite, players';
Team.register();