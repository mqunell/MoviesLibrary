### [Movies Library](http://movies-library.mattqunell.com/ 'Movies Library') on Heroku

_(note: the website will likely take a moment to startup since Heroku's free tier pauses applications after a period of inactivity)_

---

### What is It?

Movies Library is a web app for cataloging movies you own and their formats, such as DVD, Blu-ray, and Streaming. After creating an account, simply search for and select movies to add them to your library. Metadata is pulled from the [OMDb API](https://www.omdbapi.com/ 'OMDb API') and can be edited. Your library can be sorted in numerous ways, including alphabetically, by runtime, and by series.

---

### Development Overview

This was my first major experience with the entire MERN stack. Aside from React, Express, Node, and MongoDB, the project also introduced me to React Context for project-wide state management, hashing passwords and verifying against them, dynamic web hosting, and more. The OMDb API, which is where all the default movie information comes from, was crucial to making this work.

---

### Tech Stack

**Frontend**: React (via Create React App)

- Bootstrap and React-Bootstrap
- Font Awesome icons
- React Router
- React Context for site-wide alerts

**Backend**: Node and Express

- Bcrypt for password hashing
- Mongoose

**Database**: MongoDB via MongoDB Atlas

**Hosting**: Heroku

**Other**: OMDb API

---

### Interesting Challenges

#### Creating a professional development environment

This was a relatively large project compared to anything I had previously done with React or Node, and I quickly became aware of different coding styles and patterns while researching things. This led to discovering ESLint and Prettier, which were incredibly useful at helping me write good, maintainable code that would also be formatted nicely and consistently. Learning to set those up with VS Code and the popular Airbnb configurations was well worth the time, and the extensions/configurations very easily carried over into other projects.

#### Refactoring from classes to functional components

Coming from a predominantly Java background with some Android experience mixed in, the class-based structure and the component lifecycle of React components felt familiar... and then these things called "hooks" started popping up more and more while watching videos and following tutorials. After looking into hooks and functional components and discovering the benefits, I said goodbye to the comfortable classes (and not-so-comfortable "this" keyword) and refactored the project. Less boilerplate code was an immediate improvement, and hooks became more natural with time.

#### Designing the database schemas and storing the same movies for multiple users

Originally, the only parts of movies that could be edited after adding them to your library was the formats. However, the data retrieved from the OMDb API didn't always seem correct, and I occasionally wanted to change fields like genres and main actors. This meant that movies couldn't be stored in their own database table exactly as they came from OMDb anymore, and instead needed to be tied to users so one person's edits didn't show up for anyone else with the same movie.

#### Deploying on a cloud PaaS

Movies Library was first hosted on an AWS EC2 instance. Hosting on a VPS was nice because it allowed me to launch the web app the same way I do locally: "npm run start" on the frontend and "node index.js" on the backend. Although that wasn't the optimal or correct way of doing it, it worked, at least for demonstration and proof-of-concept. The problem with this approach was naively attempting to run the processes within tmux, which isn't meant to be persistent and would eventually terminate. Setting up the file structure, creating the Procfile, and configuring the Heroku CLI was all a bit of a headache, but migrating the deployment from an unmanaged VPS to Heroku was much more dependable in the end.

---

### Results

Movies Library ended up serving its purpose for me: tracking the movies I own and in which formats. Keeping track of these things turned out to be a niche problem and I didn't find much interest in the project, so development essentially stopped there, and I moved on to the next thing.

If I were to continue development, the biggest new feature I would consider is tracking movie series names and numbers myself, since they aren't part of the OMDb API. For example, if someone added Harry Potter and the Sorcerer's Stone to their library, it would also come with "Harry Potter" as the series name and "1" as the series number by default. I would also definitely need to rewrite the accounts and logging in code, since it's extremely simple at this point and easily exploitable.
