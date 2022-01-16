const keystone = require('keystone');
const TournamentType = new keystone.List('TournamentType', { autokey: { from: 'name', path: 'key', unique: true }, });

TournamentType.add({ name: { type: String, required: true }, });
TournamentType.relationship({ ref: 'Tournament', path: 'tournamentType', refPath: 'tournamentType' });
TournamentType.register();