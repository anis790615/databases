const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://hyfuser:hyfpassword@anistation-mxt3x.azure.mongodb.net/world?retryWrites=true&w=majority";
const dbName = "world";
const client = new MongoClient(uri, { useUnifiedTopology: true });
const newCity = {
  ID: 1001,
  Name: "Sanaa",
  CountryCode: "YEM",
  District: "Amanat Al-Asemah",
  Population: 3937451,
};

async function insertDocument() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    const col = db.collection("city");
    // Insert a single document
    await col.insertOne(newCity);

    // Close connection
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
}

insertDocument();
