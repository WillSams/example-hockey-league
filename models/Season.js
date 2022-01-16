const keystone = require('keystone');
const Types = keystone.Field.Types;

const Season = new keystone.List('Season', {
  map: { name: 'seasonId' },
  autokey: { from: 'name', path: 'key', unique: true }
});

Season.add({
  seasonId: { type: Types.Number, required: true, index: true, unique: true, initial: false },
  startDate: { type: Types.Date, required: true, default: '01/01/2010' },
  endDate: { type: Types.Date, required: true, default: '01/01/2010' },
});

Season.defaultSort = '-createdAt';
Season.relationship({ ref: 'Tournament', path: 'season', refPath: 'season' });
Season.relationship({ ref: 'Game', path: 'season', refPath: 'season' });
Season.defaultColumns = 'seasonId, startDate, endDate';
Season.register();