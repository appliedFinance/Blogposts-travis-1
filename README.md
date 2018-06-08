// BlogPost API

3/3/18 - Creation.
6/7/18 - travis stuff

Five End-Points
 1. GET  /posts
 2. GET  /posts/:id
 3. POST /posts
 4. PUT  /posts/:id
 5. DELETE /posts/:id
 
 Use:
 	Internal Server Errors - return 500 status along with a message.

Schema:
  __________________________________________________
  sample -
  	{
     	  "id": uuid,
	  "title": "some title",
	  "content" : "a bunch of words",
	  "author": {
		"firstName": "Sarah",
		"lastName": "Connor"
	  	    }
	}
   __________________________________________________







