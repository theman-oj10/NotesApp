from pymongo import MongoClient

# Setup MongoDB
cluster = MongoClient("mongodb+srv://manojnarender:ManojDaBeast7@cluster0.jhnmbg1.mongodb.net/")
db = cluster['ToDoApp']
collection = db["toDoList"]

collection.insert_one({"item": "manoj"})