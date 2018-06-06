const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;
chai.use(chaiHttp);

describe('BlogPost API on travis 1', function() {
	before(function() { return runServer(); });
	after(function() { return closeServer(); });


	it('should list items on GET', function () {
		return chai.request(app)
			.get('/posts')
			.then(function(result) {
				expect(result).to.have.status(200);
				expect(result).to.be.json;
				expect(result.body).to.be.a('array');
				expect(result.body.length).to.be.above(0);
				result.body.forEach(function(item) {
					expect(item).to.be.a('object');
					expect(item).to.have.all.keys('id', 'title', 'content', 'author', 'created') 
				});			
			});
	});



});

