var keystone = require('keystone')

exports = module.exports = function(req, res){
    var view = new keystone.View(req, res)
    var locals = res.locals
    locals.section = req.params.page
    locals.filter = {
        page: req.params.page
    }
    locals.data = {
        page:[]
    }
    view.on('init', function(next){
        var query = keystone.list('Page').model.findOne({
            slug: locals.filter.page
        })

        query.exec(function(err, result){
            locals.data.page = result
            console.log(locals.data)
            if (result === null) {
                res.redirect('errors/404')
            }
            next(err)
        })
    })
    view.render('page')
}