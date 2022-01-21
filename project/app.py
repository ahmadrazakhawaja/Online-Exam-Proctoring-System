# git remote add origin https://github.com/ahmadrazakhawaja/fyp_project.git
from asyncio.windows_events import NULL
from importlib import resources
import json

# from os import name
import copy
from mongoengine import *
from flask_cors import CORS
from flask import Flask, jsonify, render_template, url_for, request
from user.db2 import student
from passlib.hash import pbkdf2_sha256

app = Flask(__name__)
# Only login route allowed for all users
# cors = CORS(app, resources={r"/login": {"origins": "*"}})

# Only accessible by local host 3000
# cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
CORS(app)

conn_str = "mongodb+srv://admin:admin@cluster0.orqkl.mongodb.net/TestFYP?retryWrites=true&w=majority"
works = connect(db="TestFYP", host=conn_str)
# works = connect(conn_str)
if works:
    print("works ig", works)
else:
    print("MongoEngine Failed")

# hello
# get database connection object
# db = get_db()

# print out all the database names
# print(db.list_database_names())


@app.route("/", methods=["GET", "POST"])
def hello_world():

    name = "ahmad"
    return render_template("hello.html", name=name)


@app.route("/printDB", methods=["GET"])
def List_All():
    counter = 1
    studentList = []
    for product in student.objects:
        # print(product.to_json())
        lister = {}
        lister = {
            "Num"
            + (str)(counter): {
                "ID:": (str)(product.id),
                "Name:": product.name,
                "ERP:": product.erp,
                "userName:": product.username,
                "Email:": product.email,
                "DateCreated:": product.dateCreated.strftime("%d/%m/%Y %H:%M:%S"),
                "Profile pic:": product.profileUrl,
            }
        }
        counter += 1
        studentList.append(lister)
    return jsonify(studentList)


@app.route("/login", methods=["GET", "POST"])
def login():

    try:
        data = request.get_json()
        checkuser = student.objects(email=data["email"]).first()
        enteredpassword = data["password"]

        if not checkuser or not pbkdf2_sha256.verify(
            enteredpassword, checkuser["password"]
        ):
            print("login working")
            return "User Sign in Failed, please enter all fields correctly"
    except Exception as e:
        print("\n", e, "User doesn't exist exists\n ")
        return "User doesn't exist"
    checks = {
        "ID:": (str)(checkuser["id"]),
        "Name:": checkuser["name"],
        "ERP:": checkuser["erp"],
        "userName:": checkuser["username"],
        "Email:": checkuser["email"],
        "DateCreated:": checkuser["dateCreated"].strftime("%d/%m/%Y %H:%M:%S"),
        "Profile pic:": checkuser["profileUrl"],
    }
    print(checks)
    # ret = jsonify(header={"message": "User Sign up Successful"})
    # ret = jsonify(data2,ret.json)
    return jsonify(header={"message": "User login Successful"}, data=checks)


@app.route("/add", methods=["GET", "POST"])
def add_user():

    try:
        data = request.get_json()
        s1 = student()
        s1.erp = data["erp"]
        s1.name = data["name"]
        s1.username = data["username"]
        s1.email = data["email"]
        s1.profileUrl = data["profileUrl"]

        # encrypting password
        data["password"] = pbkdf2_sha256.hash(data["password"])
        data2 = copy.deepcopy(data)
        s1.password = data["password"]
        # data2.pop("password")

        s1.save()
    except Exception as e:
        print("\n", e, "email already exists\n ")
        return "User Sign up Failed, please enter all fields correctly"

    # ret = jsonify(header={"message": "User Sign up Successful"})
    # ret = jsonify(data2,ret.json)
    return jsonify(header={"message": "User Sign up Successful"}, data=data2)
