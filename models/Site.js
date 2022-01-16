const keystone = require('keystone');
const Types = keystone.Field.Types;
const utils = keystone.utils;

const Site = new keystone.List('Site', { autokey: { from: 'siteId', path: 'key', unique: true } });

Site.add({
  siteId: { type: Types.Number, required: true, index: true, unique: true, initial: false },
  name: { type: String, required: true, index: true, initial: false },
  street: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String, default: 'US' },
});

/*Site.schema.virtual('').get(function () {
  return;
});*/

Site.defaultSort = '-createdAt';
Site.defaultColumns = 'name, city, state, country';
Site.relationship({ ref: 'Team', path: 'homeSite', refPath: 'homeSite' });
Site.register();