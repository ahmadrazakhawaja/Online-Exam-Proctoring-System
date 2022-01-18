from datetime import datetime
from mongoengine import *



# dbs = works.list_database_names()
# for db in dbs:
#     print("dbname", db)

# collections = works["TestFYP"].list_collection_names()
# for collection in collections:
#     print("CollectionName", collection)


class student(Document):
    # id = ObjectIdField()
    erp = IntField(required=True)
    name = StringField(required=True)
    username = StringField(required=True, max_length=30)
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)
    profileUrl = StringField(required=True)
    dateCreated = DateTimeField(default=datetime.now())


# .strftime("%d/%m/%Y %H:%M:%S")

# How to do get stuff
# for product in student.objects:
# print("ID:", product.id, "Name:", product.name, "Price:", product.email).fields(id=0, name=1, email=1)
# for product in student.objects:
#     # print(product.to_json())
#     print(
#         "ID:",
#         product.id,
#         "Name:",
#         product.name,
#         "ERP:",
#         product.erp,
#         "userName:",
#         product.username,
#         "Email:",
#         product.email,
#         "DateCreated:",
#         product.dateCreated.strftime("%d/%m/%Y %H:%M:%S"),
#         "Profile pic:",
#         product.profileUrl,
#     )

# user = student.objects(email="mohanlal@gmail.com").exclude("password")
# for user1 in user:
# updateduser = user.modify(name="New_name2")

# print("old user", updateduser.to_json(), "\n")
# print("user updated to", user.to_json(), "\n")
# print("user updates",user.to_json(),"\n")
