/*const keystone = require('keystone');
const Types = keystone.Field.Types;
const utils = keystone.utils;

const Game = new keystone.List('LogItem');

LogItem.add({
});

LogItem.schema.virtual('duration').get(function () {
  return; //endTime - startTime;
});

LogItem.defaultSort = '-createdAt';
LogItem.defaultColumns = 'site, tournament, teams, startDate';
LogItem.register();*/