const { MongoClient } = require("mongodb");
const assert = require("assert");

const uri =
  "mongodb+srv://hyfuser:hyfpassword@anistation-mxt3x.azure.mongodb.net/world?retryWrites=true&w=majority";
const dbName = "world";
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function updateDocument() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    const col = db.collection("city");

    // Update a single document
    const r = await col.updateOne(
      { ID: 1001 },
      { $set: { ID: 1780, Population: 2973000 } }
    );
    assert.equal(1, r.matchedCount);
    assert.equal(1, r.modifiedCount);

    // Close connection
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
}

updateDocument();
