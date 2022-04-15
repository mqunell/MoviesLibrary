import React from 'react';

export default function About() {
	return (
		<div id="about_outer">
			<div id="about_inner">
				<div>
					<h1>Overview</h1>
					<p>
						Movies Library was my first experience with the entire MERN stack. Aside from
						React, Express, Node, and MongoDB, the project also introduced me to React
						Context for project-wide state management, hashing passwords and verifying
						against them, dynamic web hosting, and more. The OMDb API, which is where all
						the default movie information comes from, was crucial to making this work.
					</p>
				</div>

				<hr />

				<div>
					<h1>Tech Stack</h1>
					<p>
						Frontend: <b>React</b> (via Create React App)
					</p>
					<ul>
						<li>Bootstrap and React-Bootstrap CSS</li>
						<li>React Router for routing</li>
						<li>React Context for managing custom alerts</li>
					</ul>

					<p>
						Backend: <b>Express</b>
					</p>
					<ul>
						<li>Bcrypt for password hashing</li>
					</ul>

					<p>
						Database: <b>MongoDB</b> running on MongoDB Atlas
					</p>

					<p>
						Hosting: <b>Heroku</b>, formerly AWS EC2
					</p>

					<p>
						Other: <b>OMDb API</b>
					</p>
				</div>

				<hr />

				<div>
					<h1>Interesting Challenges</h1>
					<h2>Creating a professional development environment</h2>
					<p>
						This was a relatively large project compared to anything I had previously done
						with React and/or Node, and I quickly became aware of different coding styles
						and patterns while researching things. This lead to discovering ESLint and
						Prettier, which were incredibly useful at helping me write good, maintainable
						code that would also be formatted nicely and consistently. Setting those up
						with VS Code and the popular Airbnb configurations was a slight roadblock to
						continuing development, but learning to do so was definitely worth the time
						and the extensions/configurations very easily carried over into other
						projects.
					</p>

					<h2>Refactoring from classes to functional components</h2>
					<p>
						Coming from a heavy Java and background with some Android experience mixed in,
						the class-based structure and the component lifecycle of React components felt
						familiar... and then these things called "hooks" started popping up more and
						more while watching videos and following tutorials. After looking into hooks
						and functional components and discovering the benefits, I said goodbye to the
						comfortable classes (and not-so-comfortable "this" keyword) and refactored the
						project. Less boilerplate code was an immediate improvement, and hooks became
						more natural with time.
					</p>

					<h2>
						Designing the database schemas and storing the same movies for multiple users
					</h2>
					<p>
						Originally, the only parts of movies that could be edited after adding them to
						your library was the formats. However, the data retrieved from the OMDb API
						didn't always seem correct, and I occasionally wanted to change fields like
						genres and main actors. This meant that movies couldn't be stored in their own
						database table exactly as they came from OMDb anymore, and instead needed to
						be tied to users so one person's edits didn't show up for anyone else with the
						same movie.
					</p>

					<h2>Deployment on a cloud PaaS</h2>
					<p>
						Movies Library was first hosted on an AWS EC2 instance. Hosting on a VPS was
						nice because it allowed me to launch the web app the same way I do locally:
						"npm run start" on the frontend and "node index.js" on the backend. Although
						that wasn't the optimal or correct way of doing it, it worked, at least for
						demonstration and proof-of-concept... until it didn't work, because I was
						running the processes within tmux, which would eventually terminate. Setting
						up the file structure, creating the Procfile, and configuring the Heroku CLI
						was all a bit of a headache due to lots of conflicting information, but
						migrating the deployment from an unmanaged VPS to Heroku was much more
						reliable in the end.
					</p>
				</div>

				<hr />

				<div>
					<h1>Results</h1>
					<p>
						Movies Library ended up serving its purpose for me: tracking the movies I own
						and in which formats. Keeping track of these things turned out to be a niche
						problem and I didn't find much interest in the project, so development
						essentially stopped there and I moved on to the next thing. If I were to
						continue development, the biggest new feature I would consider is tracking
						movie series names and numbers myself, since they aren't part of the OMDb API.
						For example, if someone added Harry Potter and the Sorcerer's Stone to their
						library, it would also come with "Harry Potter" as the series name and "1" as
						the series number by default.
					</p>
				</div>
			</div>
		</div>
	);
}
