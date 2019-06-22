from flask import Flask, render_template, jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'citydata'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/citydata'

mongo = PyMongo(app)



@app.route('/')
def index():
    return render_template('indexMaster.html')


@app.route('/cityPop')
def getCityPop():
    collection = mongo.db.cityPopulation
    cursor = collection.find({})
    docs = []
    for document in cursor:
        del document['_id']
        docs.append(document)
    return jsonify(docs)

@app.route('/cityPop2/<city>')
def getCityPop2(city):
    collection = mongo.db.cityPopulation
    cursor = collection.find({})
    docs = []
    for document in cursor:
        del document['_id']
        if (document['city'] == city):
            docs.append(document)
    return jsonify(docs)

@app.route('/cityCrime')
def getCityCrime():
    collection = mongo.db.cityCrime
    cursor = collection.find({})
    docs = []
    for document in cursor:
        del document['_id']
        docs.append(document)
    return jsonify(docs)

@app.route('/cityCrime2/<city>')
def getCityCrime2(city):
    collection = mongo.db.cityCrime
    cursor = collection.find({})
    docs = []
    for document in cursor:
        del document['_id']
        if (document['city'] == city):
            docs.append(document)
    return jsonify(docs)


if __name__ == "__main__":
    app.run(debug=True)
