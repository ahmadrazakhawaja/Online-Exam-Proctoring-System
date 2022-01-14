from mongoengine import *

conn_str = "mongodb+srv://admin:admin@cluster0.orqkl.mongodb.net/TestFYP?retryWrites=true&w=majority"
works = connect(db="TestFYP", host=conn_str)
# works = connect(conn_str)
if works:
    print("works ig", works)
else:
    print("MongoEngine Failed")


class student(Document):
    # id = ObjectIdField()
    name = StringField(required=True)
    age = IntField(min_value=16, max_value=25)
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)


s1 = student()
s1.name = "Mohan Lal32"
s1.age = 20
# s1.email = "mohanlal@gmail.com"
s1.password = "123"
s1.save()
