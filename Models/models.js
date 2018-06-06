// MODEL

const mongoose = require('mongoose');

// this is our schema for a blog post
const blogPostSchema = mongoose.Schema(
		{	title: String,
			content: String,
			author: {firstName: String, lastName: String},
			created: {type: Date, default: Date.now}	
		});

// Virtuals
blogPostSchema.virtual('nameString').get( function() {
	return `${this.author.firstName} ${this.author.lastName}`.trim();
});

// Instance methods
blogPostSchema.methods.serialize = function() {
	return {
		id: this._id,
		title: this.title,
		content: this.content,
		author: this.nameString,
		created: this.created
	};
};

//const BlogPost = mongoose.model('BlogPost', blogPostSchema, 'blogps');
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = {BlogPost};
