from flask import Flask
from flask_pymongo import PyMongo
from pymongo import MongoClient
from flask_cors import CORS

# Setup MongoDB
cluster = MongoClient("mongodb+srv://manojnarender:<password>@cluster0.jhnmbg1.mongodb.net/")
db = cluster['ToDoApp']
collection = db["toDoList"]
def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'randomString'
    CORS(app)
    
    from routes import main
    app.register_blueprint(main)
    return app


# setup MongoDB

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5000)
    
