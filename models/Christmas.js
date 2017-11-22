var keystone = require('keystone');
var Types = keystone.Field.Types;



var Christmas = new keystone.List('Christmas', {
	autokey: { from: 'name', path: 'key', unique: true },
});


Christmas.add({
	name: { type: String, required: true },
    publishedDate: { type: Date, default: Date.now },
    header: { type: Types.CloudinaryImage },
    color: { type: Types.Color },
    price: { type: Types.Money, format: '$0,0.00' }

});


Christmas.register();