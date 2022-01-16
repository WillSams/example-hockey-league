const keystone = require('keystone');
const CurrentStateType = new keystone.List('CurrentStateType', { autokey: { from: 'name', path: 'key', unique: true }, });

CurrentStateType.add({ name: { type: String, required: true }, });
CurrentStateType.relationship({ ref: 'GameState', path: 'game-states', refPath: 'current-state-types' });
CurrentStateType.register();