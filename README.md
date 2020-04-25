# Installation instructions

### 0. Requirements
* Node.js

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
ATLAS_URI=<MongoDB Atlas connection string>
PORT=<Port number>
```

<br/>

### 3. Frontend setup - Install React dependencies
In MoviesLibrary/frontend/:
* `$ npm install`
