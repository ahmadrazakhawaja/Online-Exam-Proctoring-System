# Online Exam Proctoring System

## Project Description:
The project will help solve a current global problem faced by many institutions and teachers to assess students fairly in an online setting. The proctoring system is expected to have facial monitoring, audio monitoring, and browser tracking features. The teachers will be provided with an interface to control the features, and the students will also be provided with a separate interface to monitor them during the assessment. This project will be built on the technologies of Computer vision, Machine Learning, and Web development. Apart from this, different open source and commercial solutions have been researched for their features and pricing and it was evaluated that the commercial solutions offered some limited features along with a heavy price tag. In the end project timeline, work division and the costing of this project have been discussed. The work division is divided equally among three members for seven months. After the completion of the coding and testing of the project, it will be deployed on Amazon Web Services.

## Technologies used:

1. Node js Backend ( Communicating directly with frontend)
2. Python Flask Backend ( for deploying Machine learning Model and setting API's for getting model result)
3. React js Frontend

The Node.js Backend Communicates directly with the front end, whereas the Flask Backend is used for deploying the ML model and exposing the APIs for getting model results.

## How to Run the Application

Make sure you have installed:

1. Python
2. Node.js

**Steps:**

1. **Clone the repository**:<br>
   `git clone https://github.com/ahmadrazakhawaja/fyp_project.git`

2. **Create python virtual environment**:<br>
   go to project root folder and run the command
   on windows: `py -3 -m venv venv`
   on mac: `python3 -m venv venv`

3. **Activate Python virtual Environment**:<br>
   run this command to activate virtual environment
   on windows: `venv\Scripts\activate`
   on mac: `source venv/bin/activate`

4. **install dependencies**:<br>
   go to project folder
   `cd project`
   now run the command `pip install -r requirements.txt` to install python dependencies

5. **Activate flask backend**:<br>
   go to project directory
   `cd project`
   In the project directory run the command
   on windows:`set FLASK_APP=app`
   on mac:`export FLASK_APP=app`
   
   Set dev environment and to automatically refresh the backend flask server
   `set FLASK_ENV=development`
   Then run the command to start server
   `flask run` 
   Show all dependencies
   `pip freeze`

   Create a requirements.txt file with all dependencies
   `pip freeze > requirements.txt`

   Install all dependencies
   `pip install -r requirements.txt`

6. **Activate Node backend**:<br>
   go to Node_backend folder (Need to have Node.js installed on device)
   `cd project/Node_backend`

   Install Dependencies
   `npm install`

   To List dependencies
   `npm list --depth=0`

   Run Backend development server
   `npm run dev`


7. **Activate react frontend**:<br>
   From the project directory go to frontend/ my-app / folder and run the command
   `npm start`
   to activate react frontend

## How to push ##

Make an empty git repo
`git init`

Add files to repo
`git add --all`

Commit files to repo
`git commit -m "Committed"`

~If Already initialized a repo then just do these 3 steps:
Create branch to put files online
`git branch -M master`

Add remote origin
`git remote add origin https://github.com/ahmadrazakhawaja/fyp_project.git`

Always pull before pushing to github repositiory
`git pull`

Push to online repo
`git push -u origin master`


