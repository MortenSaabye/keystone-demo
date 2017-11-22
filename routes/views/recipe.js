var keystone = require('keystone')

exports = module.exports = function(req, res){
    var view = new keystone.View(req, res)
    var locals = res.locals

    locals.section = 'recipes'
    locals.filter = {
        recipe: req.params.recipe
    }
    locals.data = {
        recipe:[]
    }
    view.on('init', function(next){
        var query = keystone.list('Recipe').model.findOne({
            slug: locals.filter.recipe
        })

        query.exec(function(err, result){
            console.log(result)
            locals.data.recipe = result
            next(err)
        })
    })

    view.render('recipe')
}