const keystone = require('keystone');
const Types = keystone.Field.Types;

const Player = new keystone.List('Player', { autokey: { from: 'playerId', path: 'key', unique: true } });

Player.add({
  playerId: { type: String, required: true, index: true, unique: true, initial: false },
  name: { type: Types.Name, required: true, index: true, initial: false },
  suffix: { type: Types.Select, options: 'n/a, Jr., II, III, IV', default: 'n/a' },
  alias: { type: Types.Name },
  gender: { type: Types.Select, options: 'male, female', default: 'male', index: true },
  birthDate: { type: Types.Date, required: true, default: '1/1/1970' },
  birthLocale: { type: String, index: true },
  hometown: { type: String },
  height: { type: Types.Number },
  weight: { type: Types.Number },
  position: { type: String, options: 'F, D, G', default: 'F', index: true },
  shoots: { type: Types.Select, options: 'right, left', default: 'left', index: true, required: true },
  glove: { type: Types.Select, options: 'n/a, right, left', default: 'n/a', index: true },
  faves: { type: String },
  jersey: { type: Types.Number, required: true, default: '1' },
  image: { type: String },
});

Player.schema.virtual('age').get(function () {
  const diff_ms = Date.now() - this.birthDate.getTime();
  const age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
});

Player.schema.virtual('getHeight').get(function () {
  return;
});

Player.defaultSort = '-createdAt';
Player.relationship({ ref: 'Team', path: 'players', refPath: 'players' });
Player.relationship({ ref: 'PlayerplayerDefensiveStatSheet', path: 'player', refPath: 'player' });
Player.relationship({ ref: 'PlayerplayerOffensiveStatSheet', path: 'player', refPath: 'player' });
Player.defaultColumns = 'name, jersey, position, hometown, gender';
Player.register();