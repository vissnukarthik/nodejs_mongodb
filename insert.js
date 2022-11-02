const { MongoClient } = require("mongodb");

async function main() {
  const uri = "mongodb+srv://karthik:93969100@cluster0.k7jjob7.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    await client.connect();
   // await ListDatabases(client);

   /* await CreateListing(client,{
     summary:"fell the nature",
    bedrooms:1
   }) */
   const data = [{name:"poothottam",bedroom:1},{name:"kootakadu",bedroom:3}];
   await CreateMultipleListing(client,data)
  } catch (e){
    console.error(e);
  }
  finally {
    await client.close();
  }
}
main().catch(console.error);

async function CreateListing(client,newListing){
   const result = await client.db('sample_airbnb').collection("listingsAndReviews").insertOne(newListing);
   console.log(result.insertedId)
}

async function CreateMultipleListing(client,newListings){
    const result = await client.db('sample_airbnb').collection("listingsAndReviews").insertMany(newListings);
    console.log(result.insertedCount);
    console.log(result.insertedIds);
}

async function ListDatabases(client){
  const dl = await client.db().admin().listDatabases();
  dl.databases.forEach(db => {
    console.log(db)
  });
}
