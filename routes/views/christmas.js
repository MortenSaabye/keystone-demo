var keystone = require('keystone');

exports = module.exports = function(req, res){
    var view = new keystone.View(req, res);
    var locals = res.locals;

    //Set locals
    locals.section = 'christmas';

    view.query('christmas', keystone.list('Christmas').model.find())
    
    //Render view
    view.render('christmas');
}