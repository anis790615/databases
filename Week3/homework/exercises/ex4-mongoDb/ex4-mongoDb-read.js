const { MongoClient } = require("mongodb");
const assert = require("assert");

const uri =
  "mongodb+srv://hyfuser:hyfpassword@anistation-mxt3x.azure.mongodb.net/world?retryWrites=true&w=majority";
const dbName = "world";
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function readDocument() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    const col = db.collection("city");

    // Read a single document
    const docById = await col.find({ ID: 1780 }).toArray();
    const docByCityName = await col.find({ Name: "Sanaa" }).toArray();
    // assert.equal(2, docs.length);
    console.log(docById);
    console.log(docByCityName);

    // Close connection
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
}

readDocument();
