import { MongoClient } from "mongodb";
import * as cfg from "./config.js";
let db;
const getDBInstance = async () => {
  if (db) {
    console.log("using established connection");
    return db;
  }
  try {
    const client = new MongoClient(cfg.atlas, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("establishing new connection to Atlas");
    const conn = await client.connect();
    db = conn.db(cfg.appdb);
  } catch (err) {
    console.log(err);
  }
  return db;
};
const addOne = (db, coll, doc) => db.collection(coll).insertOne(doc);
const count = (db, coll) => db.collection(coll).countDocuments();
const deleteAll = (db, coll) => db.collection(coll).deleteMany({});
const updateOne = (db, coll, filter, update) =>
  db.collection(coll).updateOne(filter, { $set: update });
const deleteOne = (db, coll, criteria) =>
  db.collection(coll).deleteOne(criteria);
const addMany = (db, coll, docs) => db.collection(coll).insertMany(docs);
const findOne = (db, coll, criteria) => db.collection(coll).findOne(criteria);
const findAll = (db, coll, criteria, projection) =>
  db.collection(coll).find(criteria).project(projection).toArray();
const findUniqueValues = (db, coll, field) =>
  db.collection(coll).distinct(field);
export {
  getDBInstance,
  addOne,
  count,
  deleteOne,
  deleteAll,
  addMany,
  updateOne,
  findOne,
  findAll,
  findUniqueValues,
};
