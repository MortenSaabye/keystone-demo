var keystone = require('keystone');
var Types = keystone.Field.Types;



var Christmas = new keystone.List('Christmas', {
    map: { name: 'name'},
	autokey: { from: 'name', path: 'key', unique: true },
});


Christmas.add({
	name: { type: String},
    publishedDate: { type: Date, default: Date.now },
    header: { type: Types.CloudinaryImage },
    color: { type: Types.Color }
});


Christmas.register();