# git remote add origin https://github.com/ahmadrazakhawaja/fyp_project.git

# from asyncio.windows_events import NULL



# from os import name
import os
from pyexpat import model
from flask import Flask, render_template, request
from user.model import getmodel,predict_image2
from user.audio import upload,checkCompletion,checkQuestion
from user.wordGen import create_txt
from flask_cors import CORS
from user.facial_matching import match_faces
import urllib.request
from waitress import serve

# get_aws()
app = Flask(__name__)
model = getmodel()
# predict_image2('hello',model)
# Only login route allowed for all users
# cors = CORS(app, resources={r"/login": {"origins": "*"}})

# Only accessible by local host 3000
# cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
CORS(app)

# s3 = boto3.resource(
#     service_name='s3',
#     region_name=os.getenv('AWS_DEFAULT_REGION'),
#     aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
#     aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
# )
# for bucket in s3.buckets.all():
#     print(bucket.name)

# conn_str = "mongodb+srv://admin:admin@cluster0.orqkl.mongodb.net/TestFYP?retryWrites=true&w=majority"
# works = connect(db="TestFYP", host=conn_str)
# # works = connect(conn_str)
# if works:
#     print("works ig", works)
# else:
#     print("MongoEngine Failed")

# hello
# get database connection object
# db = get_db()

# print out all the database names
# print(db.list_database_names())
# 3

@app.route("/Pycheck", methods=["GET", "POST"])
def hello_world():
    print("chk1")
    file = request.get_data()
    print(request._get_file_stream, "works?")
    name = "ahmad"
    # return render_template("hello.html", name=name), 200
    return "MicroServices", 200


@app.route("/", methods=["GET", "POST"])
def get_image():
    name = "ahmad"
    # predict_image()
    return render_template("hello.html", name=name), 200

# @app.route("/PyImg", methods=["GET", "POST"])
# def hello_world():
#     print("chk1")
#     file = request.get_data()
#     print(request._get_file_stream, "works?")
#     name = "ahmad"
#     # return render_template("hello.html", name=name), 200
#     return "MicroServices", 200

@app.route("/PyVerify", methods=["GET", "POST"])
def hello_worldz():
    try:
        print("chk1")
        # datax = request.get_json()
        # print(datax)
        # image_data = datax['image_string']
        print(request.form)
        id = request.form['text']
        image = request.files['image']

        url0 = request.form.get('url0')
        url1 = request.form.get('url1')
        url2 = request.form.get('url2')
        image.save('user/images/'+id+'.jpg')
        result = []
        print(len(result),result, 'initial check')
        size = (533,300)

        if url0:
            urllib.request.urlretrieve(url0,'user/images/'+id+'-url0.jpg')
            # im = Image.open('user/images/'+id+'-url0.jpg')
            # im2 = im.resize(size)
            # im2.show()
            # im2.save('user/images/'+id+'-url0.jpg')
            resultx = match_faces(id+'-url0.jpg',id+'.jpg')
            result.append(resultx)
            os.remove('user/images/'+id+'-url0.jpg')

        
        if url1:
            urllib.request.urlretrieve(url1,'user/images/'+id+'-url1.jpg')
            # im = Image.open('user/images/'+id+'-url0.jpg')
            # im.resize(size)
            resultx = match_faces(id+'-url1.jpg',id+'.jpg')
            result.append(resultx)
            os.remove('user/images/'+id+'-url1.jpg')

        if url2:
            urllib.request.urlretrieve(url2,'user/images/'+id+'-url2.jpg')
            resultx = match_faces(id+'-url2.jpg',id+'.jpg')
            result.append(resultx)
            os.remove('user/images/'+id+'-url2.jpg')
        
        print(len(result),result)
        count = 0
        for i in result:
            if i == True:
                count = count + 1

        if count >= 2:
            return str(True)
        else:
            return str(False)

    except:
        return str(False)
    


@app.route("/PyImg", methods=["GET", "POST"])
def hello_worldx():
    try:
        print("chk1")
        print(request.form)
        id = request.form['text']
        image = request.files['image']

        image.save('user/images/'+id+'.jpg')

        val = predict_image2(id+'.jpg',model)
        print(val)
        os.remove('user/images/'+id+'.jpg')
        return str(val), 200

    except:
        return str(False)



@app.route("/PyDocument", methods=["GET", "POST"])
def hello_worlds():
    try:
        print("chk1")
        print(request.form)
        id = request.form['room']
        document = request.files['document']
        type = request.form['file-type']
        
        document.save('user/question_papers/'+id+type)
        create_txt(id,type)

        os.remove('user/question_papers/'+id+type)


    

        return str(True), 200

    except:
        return str(False)


@app.route("/DeleteDocument", methods=["GET","POST"])
def hello_worldccc():
    try:
        print("chk1")
        data = request.get_json(force=True)
        print(data)
        print(data['id'])
        os.remove('user/question_papers/'+data['id']+'.txt')
        return str(True), 200
    except:
        print('file not found')
        return str(False),200


@app.route("/PyAudio", methods=["GET", "POST"])
def hello_worldy():
    # datax = request.form['audio']
    # print(request.files)
    # audio = request.files['audio'].stream.read()
    # print(request.form)
    # audio_dict = request.get_data()
    try:
        id = request.form['text']
        data = request.files['audio']
        room = request.form['id']
        # print(data)
        data.save('user/audio/'+id+'.m4a')
        # print(audio_dict)
        # new_audio = audio_dict[142:len(audio_dict)]
        # new_audio = new_audio[0:len(new_audio)-56]
        # id = new_audio[len(new_audio)-26:len(new_audio)-2]
        # id = id.decode("utf-8")
        # new_audio = new_audio[0:len(new_audio)-127]
        # print(new_audio)
        # print(id)
        # print(new)
        # with open('user/audio/' + str(id) + '.m4a', "wb") as file:
        #     file.write(data)

        data1 = upload(id + '.m4a')
        print(data1)
        data2 = checkCompletion(data1)
        print(data2)
        data3 = checkQuestion(data2,room)
        print(data3)
        result = ''
        print(data3['total_count'])

        if data3['total_count'] == 0:
            result= 'Not detected'
        elif data3['total_count'] <= 3:
            result = 'low'
        elif data3['total_count'] <= 6:
            result = 'medium'
        else:
            result = 'high'
        
        os.remove('user/audio/'+id+'.m4a')
        # data = upload('Re')
        # data = checkCompletion(data)
        # data = checkQuestion(data,'he')
        return result

    except:
        return str(False)
    
if __name__ == "__main__":
    #app.run(host='0.0.0.0')
    #We now use this syntax to server our app. 
    serve(app, host='0.0.0.0', port=4000)
  

# @app.route("/printDB", methods=["GET"])
# def List_All():
#     counter = 1
#     studentList = []

#     try:
#         for product in student.objects:
#             # print(product.to_json())
#             lister = {}
#             lister = {
#                 "Num"
#                 + (str)(counter): {
#                     "ID:": (str)(product.id),
#                     "Name:": product.name,
#                     "ERP:": product.erp,
#                     "userName:": product.username,
#                     "Email:": product.email,
#                     "DateCreated:": product.dateCreated.strftime("%d/%m/%Y %H:%M:%S"),
#                     "Profile pic:": product.profileUrl,
#                 }
#             }
#             counter += 1
#             studentList.append(lister)

#     except Exception as e:
#         print("\n", e, "Lisint error\n ")
#         return (
#             jsonify(header={"message": "User List Failed to retreive"}),
#             400,
#         )
#     return (
#         jsonify(
#             header={"message": "User List Retreived Successfully"},
#             data=studentList,
#         ),
#         200,
#     )


# @app.route("/login", methods=["POST"])
# def login():

#     try:
#         data = request.get_json(force=True)
#         checkuser = student.objects(email=data["email"]).first()
#         enteredpassword = data["password"]

#         if not checkuser or not pbkdf2_sha256.verify(
#             enteredpassword, checkuser["password"]
#         ):
#             print("login working")
#             return (
#                 jsonify(
#                     header={
#                         "message": "User Sign in Failed, please enter all fields correctly"
#                     }
#                 ),
#                 400,
#             )
#     except Exception as e:
#         print("\n", e, "User doesn't exist exists\n ")
#         return jsonify(header={"message":"User doesn't exist"}), 400
#     checks = {
#         "ID": (str)(checkuser["id"]),
#         "Name": checkuser["name"],
#         "ERP": checkuser["erp"],
#         "username": checkuser["username"],
#         "Email": checkuser["email"],
#         "DateCreated": checkuser["dateCreated"].strftime("%d/%m/%Y %H:%M:%S"),
#         "Profile pic": checkuser["profileUrl"],
#     }
#     print(checks)
#     # ret = jsonify(header={"message": "User Sign up Successful"})
#     # ret = jsonify(data2,ret.json)

#     return jsonify(header={"message": "User login Successful"}, data=checks)


# @app.route("/add", methods=["GET", "POST"])
# def add_user():
#     try:
#         data = request.get_json(force=True)
#         s1 = student()
#         s1.erp = data["erp"]
#         s1.name = data["name"]
#         s1.username = data["username"]
#         s1.email = data["email"]
#         s1.profileUrl = data["profileUrl"]

#         # encrypting password
#         print(s1.profileUrl)
#         data["password"] = pbkdf2_sha256.hash(data["password"])
#         data2 = copy.deepcopy(data)
#         s1.password = data["password"]
#         # data2.pop("password")
#         # s3.Bucket('fyp-project-iba').upload_file(Filename='foo.csv', Key='foo.csv')
#         s1.save()
#     except Exception as e:
#         print("\n", e, "email already exists\n ")
#         return (
#             jsonify(
#                 header={
#                     "message": "User Sign up Failed, please enter all fields correctly"
#                 }
#             ),
#             400,
#         )

#     # ret = jsonify(header={"message": "User Sign up Successful"})
#     # ret = jsonify(data2,ret.json)
#     return (jsonify(header={"message": "User Sign up Successful"}, data=data2), 200)


# # user = student.objects(email="mohanlal@gmail.com").exclude("password")
# # for user1 in user:
# # updateduser = user.modify(name="New_name2")
# @app.route("/update/<_id>", methods=["GET", "POST"])
# def update_user(_id):
#     works.upda
#     checkuser = student.objects(id=_id).first()
#     if not checkuser:
#         return jsonify(header={"message": "User Doesn't Exist"}), 400
#     try:
#         data = request.get_json()
#         print("working so far 1")
#         s1 = student()
#         s1.erp = data["erp"] if (data["erp"]) else checkuser["erp"]
#         s1.name = data["name"] if (data["name"]) else checkuser["name"]
#         s1.username = data["username"] if (data["username"]) else checkuser["username"]
#         # s1.dateCreated = (datetime)(checkuser["dataCreated"])
#         # s1.email = data["email"]
#         s1.profileUrl = (
#             data["profileUrl"] if (data["profileUrl"]) else checkuser["profileUrl"]
#         )
#         print("working so far 2")
#         if 'password' in data:
#             # encrypting password
#             data["password"] = pbkdf2_sha256.hash(data["password"])
#             print("working so far in password check")
        
#         print("working so far 3")

#         olduser = {
#             "ID": (str)(checkuser["id"]),
#             "Name": checkuser["name"],
#             "ERP": checkuser["erp"],
#             "username": checkuser["username"],
#             "Email": checkuser["email"],
#             "DateCreated": checkuser["dateCreated"].strftime("%d/%m/%Y %H:%M:%S"),
#             "Profile pic": checkuser["profileUrl"],
#         }

#         # updateduser = checkuser.modify(**data)  # Apparently a shortcut :/
#         # Updating statements
#         name = checkuser.modify(name=s1.name)
#         erp = checkuser.modify(erp=s1.erp)
#         username = checkuser.modify(username=s1.username)
#         profileUrl = checkuser.modify(profileUrl=s1.profileUrl)

#         updateduser = {
#             "ID": (str)(checkuser["id"]),
#             "Name": checkuser["name"],
#             "ERP": checkuser["erp"],
#             "username": checkuser["username"],
#             "Email": checkuser["email"],
#             "DateCreated": checkuser["dateCreated"].strftime("%d/%m/%Y %H:%M:%S"),
#             "Profile pic": checkuser["profileUrl"],
#         }
#         # checkuser.modify(dateCreated=s1.dateCreated),
#     except:
#         return (
#             jsonify(header={"message": "update error, enter all fileds correctly out"}),
#             400,
#         )

#     return (
#         jsonify(
#             header={"message": "update checks out"},
#             data=s1.to_json(),
#             updateuser=updateduser,
#             olduser=olduser,
#         ),
#         200,
#     )
