var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'blog';
	locals.filters = {
		post: req.params.post
	};
	locals.data = {
		posts: []
	};

	// Load the current post
	view.on('init', function (next) {
		console.log('load current post')
		var q = keystone.list('Post').model.findOne({
			state: 'published',
			slug: locals.filters.post
		}).populate('author categories');

		q.exec(function (err, result) {
			locals.data.post = result;
			next(err);
		});
	});

	// Load comments on the Post
	view.on('init', function (next) {
		console.log('load comments')
		keystone.list('PostComment').model.find()
			.where('post', locals.data.post)
			.where('commentState', 'published')
			.where('author').ne(null)
			.populate('author', 'name photo')
			.sort('-publishedOn')
			.exec(function (err, comments) {
				if (err) return res.err(err);
				if (!comments) return res.notfound('Post comments not found');
				locals.data.comments = comments;
				next();
			});
	});

	// Create a Comment
	view.on('post', { action: 'comment.create' }, function (next) {

		var newComment = new (keystone.list('PostComment')).model({
			state: 'published',
			post: locals.data.post.id,
			author: locals.user.id,
		});
		var updater = newComment.getUpdateHandler(req);

		updater.process(req.body, {
			fields: 'content',
			flashErrors: true,
			logErrors: true,
		}, function (err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				req.flash('success', 'Your comment was added.');
				res.redirect('/blog/post/' + locals.data.post.slug + '#comment-id-' + newComment.id);
			}
			next();
		});
	});

	// Delete a Comment
	view.on('get', { remove: 'comment' }, function (next) {
		console.log('delete comment')
		if (!req.user) {
			req.flash('error', 'You must be signed in to delete a comment.');
			return next();
		}

		keystone.list('PostComment').model.findOne({
			_id: req.query.comment,
			post: locals.data.post.id,
		})
			.exec(function (err, comment) {
				if (err) {
					if (err.name === 'CastError') {
						req.flash('error', 'The comment ' + req.query.comment + ' could not be found.');
						return next();
					}
					return res.err(err);
				}
				if (!comment) {
					req.flash('error', 'The comment ' + req.query.comment + ' could not be found.');
					return next();
				}
				if (comment.author != req.user.id) {
					req.flash('error', 'Sorry, you must be the author of a comment to delete it.');
					return next();
				}
				comment.commentState = 'archived';
				comment.save(function (err) {
					if (err)
						return res.err(err);
					req.flash('success', 'Your comment has been deleted.');
					return res.redirect('/blog/post/' + locals.data.post.slug);
				});
			});
	});


	// Render the view
	view.render('post');

};