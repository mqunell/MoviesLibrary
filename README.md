# Installation instructions

### 0. Requirements
* Node.js

<br/>

### 1. Clone the repository
`$ git clone https://github.com/mqunell/MoviesLibrary.git`

<br/>

### 2. Backend setup - Install Node dependencies
In MoviesLibrary/backend/:
* `$ npm install express cors dotenv mongoose nodemon`
* Manually copy .env, which looks like this:
```
ATLAS_URI=<MongoDB Atlas connection string>
PORT=<Port number>
```
