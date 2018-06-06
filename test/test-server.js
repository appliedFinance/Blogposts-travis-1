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
				expect(result).to.be.json;
			});
	});



});

