import pymongo

def get_db():

    # Replace the uri string with your MongoDB deployment's connection string.
    conn_str = "mongodb+srv://admin:admin@cluster0.orqkl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

    # set a 5-second connection timeout
    client = pymongo.MongoClient(conn_str, serverSelectionTimeoutMS=5000)

    try:
        #print(client.server_info())
        pass
    except Exception:
        print("Unable to connect to the server.")

    return client