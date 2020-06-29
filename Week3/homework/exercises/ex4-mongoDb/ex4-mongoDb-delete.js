const { MongoClient } = require("mongodb");
const assert = require("assert");
const uri =
  "mongodb+srv://hyfuser:hyfpassword@anistation-mxt3x.azure.mongodb.net/world?retryWrites=true&w=majority";
const dbName = "world";
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function deleteDocument() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    const col = db.collection("city");

    // Remove a single document
    const r = await col.deleteOne({ ID: 1780 });
    assert.equal(1, r.deletedCount);
    console.log(r);

    // Close connection
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
}

deleteDocument();
