# Online Exam Proctoring System

## Technologies used:

1. Python Flask Backend
2. React js Frontend

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
   Then run the command
   `flask run`
   to activate the backend flask server

6. **Activate react frontend**:<br>
   From the project directory go to frontend/ my-app / folder and run the command
   `npm run`
   to activate react frontend

## How to push

Make an empty git repo
`git init`

Add files to repo
`git add --all`

Commit files to repo
`git commit -m "Committed"`

~If Already initialized a repo then just do these 3 steps:
Create branch to put files online
`git branch -M master`

Add to online repo
`git remote add origin https://github.com/ahmadrazakhawaja/fyp_project.git`

If remote origin already exists just add files
`git add --all`

Always pull before pushing to github repositiory
`git pull`

Push to online repo
`git push -u origin master`


