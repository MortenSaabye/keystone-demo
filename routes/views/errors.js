var keystone = require('keystone')

exports = module.exports = function(req, res){
    var view = new keystone.View(req, res)
    var locals = res.locals
    var code = req.params.code
    if(code === '404') {
        view.render('errors/404')
    } else if(code === '500') {
        view.render('errors/500')
    }
}