var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Recipe Model
 * =============
 */

var Ingredient = new keystone.List('Ingredient', {
    map: { name: 'name' },
    autokey: { path: 'slug', from: 'title', unique: true },
});


Ingredient.add({
    name: { type: String}
});

Ingredient.register();
