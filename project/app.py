# git remote add origin https://github.com/ahmadrazakhawaja/fyp_project.git
from os import name
from flask import Flask
from markupsafe import escape
from flask import url_for
from flask import render_template
from user.db import get_db

app = Flask(__name__)

# get database connection object
db = get_db()

#print out all the database names
print(db.list_database_names())

@app.route("/", methods=['GET', 'POST'])
def hello_world():
    name = "ahmad"
    return render_template('hello.html', name=name)
