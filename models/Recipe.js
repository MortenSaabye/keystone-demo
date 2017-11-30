var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Recipe Model
 * =============
 */

var Recipe = new keystone.List('Recipe', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true },
    singular: 'Recipe',
    plural: 'Recipes'
});


Recipe.add({
    title: { type: String, required: true },
    time: { type: Number },
    author: { type: Types.Relationship, ref: 'User', index: true },
    publishedDate: { type: Date, default: Date.now },
	heroImage: { type: Types.CloudinaryImage },
    images: { type: Types.CloudinaryImages },
    ingredients: {type: Types.Relationship, ref: 'Ingredient', many: true},
    guide: { type: Types.Html, wysiwyg: true, height: 400 }
});

Recipe.relationship({path: 'ingredients', ref: 'Ingredient', refPath: 'recipe'})

Recipe.register();
