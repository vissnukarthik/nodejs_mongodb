const { MongoClient } = require("mongodb");

async function main() {
  const uri = "mongodb+srv://karthik:<password>@cluster0.k7jjob7.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try { 
    await client.connect();
    await ListDatabases(client);
  } catch (e){
    console.error(e);
  }
  finally {
    await client.close();
  } 
}
main().catch(console.error);

async function ListDatabases(client){
  const dl = await client.db().admin().listDatabases();
  dl.databases.forEach(db => {
    console.log(db)
  });
}