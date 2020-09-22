const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');
const url = require('url');

const USER = encodeURIComponent(config.dbuser);
const PASSWORD = encodeURIComponent(config.dbpassword);
const DB_NAME = config.dbname;
const DB_HOST = config.dbhost;

const MONGO_URI= `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    this.dbName = DB_NAME;
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) {
            reject(err);
          };

          console.log('Connected successfully to mongo');
          resolve(this.client.db(this.dbName));
        });
      });
    };
    return MongoLib.connection;
  };

  getAll(collection, query) {
    return this.connect()
      .then((db) => {
        return db
          .collection(collection)
          .find(query)
          .toArray();
      });
  }

  create(collection, data) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).insertOne(data);
      })
      .then((result) => result.insertedId);
  }

  delete(collection, id) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).deleteOne({ _id: ObjectId(id) });
      })
      .then(() => id);
  }
 };

module.exports = MongoLib;