# Text app for toolbox technical test.

This project was made as a knowledge test performed by toolbox.

Check live demo here : https://text.app.yilmer.work

## How to run:

### Using docker-compose

First make sure you have docker installed and running

In the project directory, you can run this command to build de image:

#### `docker compose build`

When build is done, then run this command to start the container:

#### `docker compose up`

Go to http://localhost to view it in the browser.


### Using docker

First make sure you have docker installed and running

In your terminal or CMD run this command to start the backend:

#### `docker run -d -p 3001:3001 yavilavi/toolbox-technical-test-api`

Then run this command to start the frontend:

#### `docker run -d -p 80:80 yavilavi/toolbox-technical-test-client`

Go to http://localhost to view it in the browser.

### Using NPM

In the terminal or cmd navigate to "api" directory and run:

#### `npm install`

Then run:

#### `npm start`

Then to start de front in your terminal navigate to "client" directory and run

#### `npm install`

Then run:

#### `npm start`

If browser is not opened automatically go to [http://localhost:3000](http://localhost:3000) to view it in the browser. 


### To run tetst

In the terminal or cmd navigate to "api" directory and run:

#### `npm test`

This will test all routes in backend


Front end test weren't written due to time matters


### Extras

* Authenticaton using JWT (login, register, protected routes)
* Mongo db storage for data persistence
* Edit, Delete, View, alerts and search features
* Can be ran using docker-compose or docker compose
* VCS using GIT and GitGub
* Deployed in AWS Check live demo here : https://text.app.yilmer.work
