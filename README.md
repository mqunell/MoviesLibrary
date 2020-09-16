# Installation instructions

### 0. Requirements
* [Node.js](https://github.com/nodesource/distributions/blob/master/README.md#debinstall "Node.js") (npm included)

<br/>

### 1. Clone the repository
`$ git clone https://github.com/mqunell/MoviesLibrary.git`

<br/>

### 2. Backend setup - Install Node dependencies
In MoviesLibrary/backend/:
* `$ npm install`
* Whitelist the server IP address in MongoDB Atlas
* Manually copy .env, which looks like this:
```
EXPRESS_PORT=<Port number>
MONGO_URI=<MongoDB Atlas connection string>
OMDB_KEY=<OMDb key>
```

Start with `nodemon server.js`

<br/>

### 3. Frontend setup - Install React dependencies
In MoviesLibrary/frontend/:
* `$ npm install`

Start with `$ npm start`
