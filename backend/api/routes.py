from flask import Blueprint, jsonify, request
from __init__ import collection

main = Blueprint('main', __name__)

@main.route('/')
def hello_backend():
    return "Hello Backend"

@main.route('/add_item', methods=['POST'])
def add_item():
    try:
        if request.method == "POST":
            newItem = request.get_json().get("item")
            itemNo = request.get_json().get("item_no")
            print(f" Added Item: {newItem}")
            print(f" Added Item: {itemNo}")
            collection.insert_one({"item_no": f"{itemNo}","item": f"{newItem}"})
            return "Done", 201
    except Exception as e:
        print(f"Error : {e}")
    return "Can't add", 404


@main.route('/del_item', methods=['POST'])
def delete_item():
    try:
        if request.method == "POST":
            delItem = request.get_json().get("item")
            itemNo = request.get_json().get("item_no")
            print(f" Deleted Item: {delItem}")
            print(f" Deleted Item_No: {itemNo}")
            collection.delete_one({"item_no": f"{itemNo}","item": f"{delItem}"})
            return "Done", 201
    except Exception as e:
        print(f"Error : {e}")
    return "Can't delete", 404


@main.route('/todolist', methods=['GET'])
def todolist():
    try:
        lst = []
        results = collection.find({"item": {"$exists": True}}).sort("item_no", -1)
        for document in results:
            lst.append(document["item"])
        return jsonify(lst)
    except Exception as e:
        print(f"Error : {e}")
    return "Can't retrieve To do list", 404
