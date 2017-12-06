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
        }).populate('ingredients')

        query.exec(function(err, result){
            console.log(result + "Hej ")
            locals.data.recipe = result
            next(err)
        })
    })

    view.render('recipe')
}