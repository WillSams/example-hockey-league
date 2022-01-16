const keystone = require('keystone');
const Types = keystone.Field.Types;
const utils = keystone.utils;

const Tournament = new keystone.List('Tournament', { autokey: { from: 'title', path: 'key', unique: true }, });

Tournament.add({
  name: { type: String, required: true, index: true, unique: true, initial: false },
  season: { type: Types.Relationship, ref: 'Season', many: false, index: true },
  tournamentType: { type: Types.Relationship, ref: 'TournamentType', many: false },
  teams: { type: Types.Relationship, ref: 'Team', many: true, many: true, index: true, initial: false },
  startDate: { type: Types.Date, required: true, initial: false },
  endDate: { type: Types.Date, required: true, initial: false },
});

Tournament.defaultSort = '-createdAt';
Tournament.relationship({ ref: 'Game', path: 'tournament', refPath: 'tournament' });
Tournament.defaultColumns = 'name, season, tournamentType, startDate, endDate';
Tournament.register();