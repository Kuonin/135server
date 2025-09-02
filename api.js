
const conString = "mongodb+srv://kyleong_db_user:PKldRtHu66E76w1H@cluster0.agfodrd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
/*
async function main() {
	// we'll add code here soon
    const {MongoClient} = require('mongodb');
    const client = new MongoClient(conString);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);

        await deleteListingByName(client, "Cozy Cottage");

        await deleteListingsScrapedBeforeDate(client, new Date("2019-02-15"));

        // await updateListingByName(client, "Infinite Views", { bedrooms: 6, beds: 8 });

        // await upsertListingByName(client, "Cozy Cottage", { name: "Cozy Cottage", bedrooms: 2, bathrooms: 1 });

        // await upsertListingByName(client, "Cozy Cottage", { beds: 2 });

        // await updateAllListingsToHavePropertyType(client);

        // Find the listing named "Infinite Views" that we created in create.js
        // await findOneListingByName(client, "Infinite Views");

        // Find up to 5 listings with at least 4 bedrooms and at least 2 bathrooms
        // If you recently ran create.js, a listing named Beautiful Beach House should be included in the results 
        // await findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
        //     minimumNumberOfBedrooms: 4,
        //     minimumNumberOfBathrooms: 2,
        //     maximumNumberOfResults: 5
        // });
    //     await createListing(client,
    //     {
    //         name: "Lovely Loft",
    //         summary: "A charming loft in Paris",
    //         bedrooms: 1,
    //         bathrooms: 1
    //     }
    // );
    // Create 3 new listings
        // await createMultipleListings(client, [
        //     {
        //         name: "Infinite Views",
        //         summary: "Modern home with infinite views from the infinity pool",
        //         property_type: "House",
        //         bedrooms: 5,
        //         bathrooms: 4.5,
        //         beds: 5
        //     },
        //     {
        //         name: "Private room in London",
        //         property_type: "Apartment",
        //         bedrooms: 1,
        //         bathroom: 1
        //     },
        //     {
        //         name: "Beautiful Beach House",
        //         summary: "Enjoy relaxed beach living in this house with a private beach",
        //         bedrooms: 4,
        //         bathrooms: 2.5,
        //         beds: 7,
        //         last_review: new Date()
        //     }
        // ]);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
};
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
async function createListing(client, newListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}
async function createMultipleListings(client, newListings){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings);

    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);       
}

async function findOneListingByName(client, nameOfListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({ name: nameOfListing });

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}
async function findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
    minimumNumberOfBedrooms = 0,
    minimumNumberOfBathrooms = 0,
    maximumNumberOfResults = Number.MAX_SAFE_INTEGER
} = {}) {

    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find for the find() docs
    const cursor = client.db("sample_airbnb").collection("listingsAndReviews")
        .find({
            bedrooms: { $gte: minimumNumberOfBedrooms },
            bathrooms: { $gte: minimumNumberOfBathrooms }
        }
        )
        .sort({ last_review: -1 })
        .limit(maximumNumberOfResults);

    // Store the results in an array
    const results = await cursor.toArray();

    // Print the results
    if (results.length > 0) {
        console.log(`Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms:`);
        results.forEach((result, i) => {
            const date = new Date(result.last_review).toDateString();

            console.log();
            console.log(`${i + 1}. name: ${result.name}`);
            console.log(`   _id: ${result._id}`);
            console.log(`   bedrooms: ${result.bedrooms}`);
            console.log(`   bathrooms: ${result.bathrooms}`);
            console.log(`   most recent review date: ${date}`);
        });
    } else {
        console.log(`No listings found with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms`);
    }
}

async function updateListingByName(client, nameOfListing, updatedListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews")
                        .updateOne({ name: nameOfListing }, { $set: updatedListing });

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

async function upsertListingByName(client, nameOfListing, updatedListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews")
                        .updateOne({ name: nameOfListing }, 
                                   { $set: updatedListing }, 
                                   { upsert: true });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);

    if (result.upsertedCount > 0) {
        console.log(`One document was inserted with the id ${result.upsertedId._id}`);
    } else {
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
    }
}

async function updateAllListingsToHavePropertyType(client) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews")
                        .updateMany({ property_type: { $exists: false } }, 
                                    { $set: { property_type: "Unknown" } });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

async function deleteListingByName(client, nameOfListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews")
            .deleteOne({ name: nameOfListing });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

async function deleteListingsScrapedBeforeDate(client, date) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews")
        .deleteMany({ "last_scraped": { $lt: date } });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}



main().catch(console.error);
*/

//------------------------------------Part 0 code + part 1

const {MongoClient} = require('mongodb');
const client = new MongoClient(conString);

const http = require("http");
const host = 'localhost';
const port = 5000;

//Test Data for the routes

let database = "test_data";

let data = [
    {"sessionid": 1, "data": "hello world"},
    {"sessionid": 2, "data": "goodbye world"}
];

let findData = (id) => {
    return data.find((session) => {
        if(session.sessionid == id)
            return session;
    });
}

let stat = JSON.stringify(data);


const requestListener = function (req, res) {
    try{
        res.setHeader("Content-Type", "application/json");

        client.connect();

        const methodType = req.method.toUpperCase();
        const url = req.url;
        let parts = url.split("/");
        switch(parts[1]){ // should be parts = [ '', 'static', 'id']
            case "static":
                switch(methodType){
                    case 'GET':
                        if(parts.length == 2){ //send all the data
                            res.writeHead(200);
                            res.end(stat);
                        }
                        else if(parts.length == 3){
                            getMethodHandler(parts[2], req, res);
                        }
                        else{
                            res.writeHead(404);
                            res.end(JSON.stringify({error: "Url not found :("}));
                        }
                        break;
                    case 'POST':
                        res.writeHead(200);
                        postHandler(client, req.body);
                        res.end(`We received ${methodType} type request`);
                        break;
                    case 'PUT':
                        res.writeHead(200);
                        res.end(`We received ${methodType} type request`);
                        break;
                    case 'DELETE':
                        res.writeHead(200);
                        res.end(`We received ${methodType} type request`);
                        break;
                    default:
                        res.writeHead(404);
                        res.end(JSON.stringify({error: "Method not found :("}));
                }
                break
            default:
                res.writeHead(404);
                res.end(JSON.stringify({error: "Resource not found :("}));
        }
        client.close();
        

    }catch (error){
        res.writeHead(400);
        res.end(error.message);
    }
};

async function postHandler(client, data){
    const result = await client.db(database).collection("testing").insertOne(data);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

// const postHandler = (client, data) => {
//     const result = client.db(database).collection("testing").insertOne(data);
//     console.log(`New listing created with the following id: ${result.insertedId}`);
// }

const getMethodHandler = (id, req, res) => {
    let session = findData(id);
    if(!session){
        res.writeHead(400);
        res.end(`The session with id ${id} is not found.`);
    }
    res.writeHead(200);
    res.end(JSON.stringify(session));
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
