"""
To create the database do:
1) Open a Terminal (check if it is inside a venv) (source venv/bin/activate)
2) Locate the directory
3) type: python3
4) type: from create_db import init_db
5) type: init_db()
6) exit()
Now, a db should exist.
After that, you can run the app
"""
import json
import requests
from flask_mail import Mail, Message
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
from flask import Flask, render_template, request, flash, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.types import Float
from sqlalchemy.types import Integer
import os

app = Flask(__name__)
app.secret_key = "mySecret"
api = Api(app)
cors = CORS(app)
mail = Mail(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'teamsixicshop@gmail.com'
app.config['MAIL_PASSWORD'] = 'Team6ICshop'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True



class flavors(Resource):
    def get(self):
        return jsonFlavorFile()

    def post(self):
        some_json = request.get_json()
        flavor = some_json.get("flavor")
        price = some_json.get("price")
        image = some_json.get("image")
        # print(flavor + " " + str(price) + " " + image)
        addFlavor(flavor,price,"image")
        return ""

    def delete(self):
        some_json = request.get_json()
        flavor = some_json.get("flavor")
        price = some_json.get("price")
        image = some_json.get("image")
        # print(flavor + " " + str(price) + " " + image)
        deleteFlavor(flavor)
        return jsonFlavorFile()


class orders(Resource):
    def get(self):
        return jsonOrderFile()

    def post(self):
        print("entered")
        some_json = request.get_json()
        print(some_json)
        date = some_json.get("date")
        id = (some_json.get("id"))
        items = some_json.get("items")
        price = int(some_json.get("price"))
        quant = int(some_json.get("quant"))

        addOrder(date, id, items, price, quant)
        return jsonFlavorFile()

    def delete(self):
        some_json = request.get_json()
        id = some_json.get("id")
        deleteOrder(id)
        print("Deleting " + "("*20)
        return jsonOrderFile()


class users(Resource):
    def get(self):
        return jsonUserfile()

    def post(self, username, password):
        addUser(username, password)
        return jsonUserfile()

    def delete(self, username):
        deleteUser(username)
        return jsonUserfile()

# class emails(Resource):
#     def get(self):
#         return jsonify("{email:}")
#     def post(self):
#         customer_email = request.form['email']
#         numItems = int(request.form['cart'])
#         flavorsPurchased = request.form['allFlavors']
#         total = int(request.form['Total'])
#
#         msg = Message('Order Complete', sender='teamsixicshop@gmail.com', recipients=customer_email)
#         msg.body = 'Thank you for shopping at The Scoop Shop! Your total is {} for {} item(s). Your order consists of {}.'.format(
#             total, numItems, flavorsPurchased)
#         # msg.body = f'Thank you for shopping at The Scoop Shop! Your total is {total} for {numItems} item(s). Your order consists of {flavorsPurchased}.'
#         mail.send(msg)
#         return 'Email sent'
#
# api.add_resource(emails,"/sendEmail")
api.add_resource(users, "/users/")
api.add_resource(orders, "/orders/")
api.add_resource(flavors, "/flavors/")

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///' + os.path.join(basedir, 'main.sqlite3')
app.config["SQLALCHEMY_BINDS"] = {
    'flavors': 'sqlite:///' + os.path.join(basedir, 'flavors.sqlite3'),
    'orders': 'sqlite:///' + os.path.join(basedir, 'orders.sqlite3'),
    'users': 'sqlite:///' + os.path.join(basedir, 'users.sqlite3')
}

db = SQLAlchemy(app)


class Flavor(db.Model):
    __bind_key__ = "flavors"
    flavor = db.Column(db.String(50), primary_key=True)
    price = db.Column(db.Integer(), unique=False)
    image = db.Column(db.String(50))

    def __init__(self, f, p, i):
        self.flavor = f
        self.price = p
        self.image = i


class Order(db.Model):
    __bind_key__ = "orders"
    date = db.Column(db.String(50), unique=False)
    id = db.Column(db.String(50), primary_key=True)
    items = db.Column(db.String(300), unique=False)
    price = db.Column(db.Float(), unique=False)
    quant = db.Column(db.Integer(), unique=False)
    total = db.Column(db.Float(), unique=False)

    def __init__(self, date, id, items, price, quant, total):
        self.date = date
        self.id = id
        self.items = items
        self.price = price
        self.quant = quant
        self.total = total


class User(db.Model):
    __bind_key__ = 'users'
    username = db.Column(db.String(50), primary_key=True)
    password = db.Column(db.String(50))

    def __init__(self, u, p):
        self.username = u
        self.password = p



def init_db():
    # initialize the database for the app
    with app.app_context():
        db.create_all()
        db.session.commit()
        # return app


def addFlavor(flavor, price, imageURL):
    print("adding")
    newFlavor = flavor
    newPrice = price
    newImage = imageURL
    newIC = Flavor(newFlavor, newPrice, newImage)
    db.session.add(newIC)
    print("Added " + newFlavor)
    db.session.commit()


def deleteFlavor(flavor):
    print("deleting " + flavor)
    selFlavor = Flavor.query.filter_by(flavor=flavor).first()
    if selFlavor:
        db.session.delete(selFlavor)
        db.session.commit()
        print("flavor deleted")


def editFlavor(flavor, nFlavor, nPrice, nImage):
    print("editing " + flavor)
    selFlavor = Flavor.query.filter_by(flavor=flavor).first()
    if selFlavor:
        db.session.delete(selFlavor)
        db.session.add(Flavor(nFlavor, nPrice, nImage))
        db.session.commit()
        print("flavor edited")


def deleteAllFlavors():
    db.drop_all(bind_key="flavors")
    db.session.commit()
    db.create_all(bind_key='flavors')
    print("deleted")
    db.session.commit()


def addOrder(date, id, items, price, quant):
    print("adding Order " + date)
    newOrder = Order(date, id, items, price, quant, price * quant)
    print("new order")
    db.session.add(newOrder)
    print("added order " + date)
    db.session.commit()


def editOrder(id, nDate, nID, nItems, nPrice, nQuant):
    print("editing order: " + str(id))
    selOrder = Order.query.filter_by(id=id).first()
    if selOrder:
        db.session.delete(selOrder)
        db.session.add(Order(nDate, nID, nItems, nPrice, nQuant, nPrice * nQuant))
        db.session.commit()
        print("Order edited")


def deleteOrder(id):
    print("deleting order: " + str(id))
    selOrder = Order.query.filter_by(id=id).first()
    if selOrder:
        db.session.delete(selOrder)
        db.session.commit()
        print("deleted order: " + str(id))


def deleteAllOrders():
    print("Deleting all orders")
    db.drop_all(bind_key="orders")
    db.session.commit()
    db.create_all(bind_key="orders")
    db.session.commit()
    print("All orders deleted")


def addUser(user, password):
    print("adding user")
    db.session.add(User(user, password))
    print('added user ' + user + " " + password)
    db.session.commit()


def editUser(user, nUser, nPassword):
    print("editing user " + user)
    selUser = User.query.filter_by(username=user).first()
    if selUser:
        db.session.delete(selUser)
        db.session.add(User(nUser, nPassword))
        db.session.commit()
        print("User edited")


def deleteUser(user):
    print("deleting " + user)
    selUser = User.query.filter_by(username=user).first()
    if selUser:
        db.session.delete(selUser)
        db.session.commit()
        print(user + " deleted")


def deleteAllUsers():
    db.drop_all(bind_key="users")
    db.session.commit()
    db.create_all(bind_key="users")
    print("All users are deleted")
    db.session.commit()


def jsonOrderFile():
    orders = Order.query.all()
    print(orders)
    orderList = list()
    for order in orders:
        orderDict = dict()
        orderDict["date"] = order.date
        orderDict["id"] = order.id
        orderDict["items"] = order.items
        orderDict["price"] = order.price
        orderDict["quant"] = order.quant
        orderDict["total"] = order.price * order.quant
        orderList.append(orderDict)
    return jsonify(orderList)


def jsonFlavorFile():
    flavors = Flavor.query.all()
    print(flavors)
    flavorList = list()
    for flavor in flavors:
        flavorDict = dict()
        flavorDict["flavor"] = flavor.flavor
        flavorDict["price"] = flavor.price
        flavorDict["image"] = flavor.image
        flavorList.append(flavorDict)
    return jsonify(flavorList)


def jsonUserfile():
    users = User.query.all()
    print(users)
    userList = list()
    for user in users:
        userDict = dict()
        userDict["username"] = user.username
        userDict["password"] = user.password
        userList.append(userDict)
        print(userList)
    return jsonify(userList)

def send_email():
    customer_email = request.form['email']
    numItems = int(request.form['cart.length'])
    flavorsPurchased = request.form['allFlavors']
    total = int(request.form['Total'])

    msg = Message('Order Complete',  sender = 'teamsixicshop@gmail.com', recipients=[customer_email])
    msg.body = 'Thank you for shopping at The Scoop Shop! Your total is {} for {} item(s). Your order consists of {}.'.format(total, numItems, flavorsPurchased)
    # msg.body = f'Thank you for shopping at The Scoop Shop! Your total is {total} for {numItems} item(s). Your order consists of {flavorsPurchased}.'
    mail.send(msg)
    return 'Email sent'

if __name__ == '__main__':
    app.run(debug=True)



@app.route('/')
@cross_origin()
def home():
    addOrder("22222",5,"Chocalate",20,2)
    return "jasdlkfjas;dklfja"


@app.route('/flavor/addFlavor/<flavor>/<float:price>', methods={'POST'})
def addFlavorURL(flavor, price):
    if(request.method == 'POST'):
        print(flavor + " " + str(price))
        addFlavor(flavor, price, "img")
    return jsonify({'result': "added flavor"})


if __name__ == "__main__":
    app.run()
