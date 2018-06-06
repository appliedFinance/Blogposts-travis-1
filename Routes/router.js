// ROUTES

'use strict';

const express = require('express');
const router = express.Router();

const { BlogPost } = require('../Models/models');
const say = (s)=> { console.log(s); }

// GET
router.get("/", (req,res) => {
	BlogPost
		.find()
		.then( posts=> {
			res.json(  posts.map( p=> p.serialize() )  );
		})
	.catch( err=> {
		say(err);
		res.status(500).json({ sig: 'Internal server error' });
	});
});

// GET By ID
router.get("/:id", (req, res)=> {
	BlogPost
		.findById( req.params.id )
		.then( p=> { res.json(p.serialize()); } )
		.catch( err=> {
			say(err);
			res.status(500).json( { sig: 'Internal server error' });
		});
});

// POST
router.post("/", (req, res) => {
	const requiredFields = ['title', 
									'content', 
									'author'];
	for (let i = 0; i < requiredFields.length; i++) 
	{
		let field = requiredFields[i];
		if ( !(field in req.body) ) 
		{
			const message = `Missing field: "${field}"`;
			say(message);
			return res.status(400).send(message);
		}
	}

	BlogPost
		.create({
			title: req.body.title,
			content: req.body.content,
			author: req.body.author
		})
	.then( post=> res.status(201).json( post.serialize() )  )
		.catch( err=> {
			say(err);
			res.status(500).json({ error: 'Post Failed.' });
		});
});

// PUT - Edit post
router.put("/:id", (req, res) => {
	// make sure the 'id' is here
	if ( !(req.params.id 
				&& req.body.id 
				&& (req.params.id === req.body.id)) ) {

		res.status(400).json({
			error: 'Request path id and request body id values must match'
		});
	}

	const toUpdate = {};
	const updateableFields = [	'title', 
										'content', 
										'author.lastName',
										'author.firstName'];
	updateableFields.forEach( field=> {
		if (field in req.body) {
			toUpdate[field] = req.body[field];
		}
	});

	BlogPost
		.findByIdAndUpdate( req.params.id, { $set: toUpdate }, { new: true } )
		.then( updatedPost=> res.status(204).end())
		.catch( err=> res.status(500).json({ message: "Couldn't Update" }));
});

// DELETE by Id
router.delete("/:id", (req, res) => {
	BlogPost
		.findByIdAndRemove(req.params.id)
		.then(() => {
			res.status(204).json({ message: 'success' });
		})
	.catch( err =>{
		const message = `... Missed -> ${req.params.id}`; say(message);
		console.error(err);
		res.status(500).json({ error: 'something went terribly wrong' });
	});
});


module.exports = router;
