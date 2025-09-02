
const conString = "mongodb+srv://kyleong_db_user:PKldRtHu66E76w1H@cluster0.agfodrd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


//------------------------------------Part 0 code + part 1

const {MongoClient} = require('mongodb');
const client = new MongoClient(conString);

const http = require("http");
const host = 'localhost';
const port = 5000;

//Test Data for the routes

// let database = "test_data";

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

        const methodType = req.method.toUpperCase();
        const url = req.url;
        let parts = url.split("/");
        let database = "";
        switch(parts[1]){ // should be parts = [ '', 'static', 'id']
            case "static":
                database = "static"
                break;
            case "performance":
                database = "performance"
                break;
            case "active":
                database = "active"
                break;
            default:
                res.writeHead(404);
                res.end(JSON.stringify({error: "Resource not found :("}));
        }
        switch(methodType){
            case 'GET':
                if(parts.length == 2){ //send all the data
                    getMethodHandler(null, req, res, database);
                }
                else if(parts.length == 3){
                    getMethodHandler(parts[2], req, res,database);
                }
                else{
                    res.writeHead(404);
                    res.end(JSON.stringify({error: "Url not found :("}));
                }
                break;
            case 'POST':
                getRequestBodyAndGenerateResponse(req, res,po,database);
                break;
            case 'PUT':
                // res.writeHead(200);
                // res.end(`We received ${methodType} type request`);
                if(parts.length == 3){
                    putMethodHandler(parts[2],req, res,database);
                }
                else{
                    res.writeHead(404);
                    res.end("No id was given or in incorrect format");
                }
                break;
            case 'DELETE':
                // res.writeHead(200);
                // res.end(`We received ${methodType} type request`);
                if(parts.length == 3){
                    deleteMethodHandler(parts[2],req, res,database);
                }
                else{
                    res.writeHead(404);
                    res.end("No id was given or in incorrect format");
                }
                break;
            default:
                res.writeHead(404);
                res.end(JSON.stringify({error: "Method not found :("}));
        }        

    }catch (error){
        //res.writeHead(400);
        //res.end(error.message);
        console.log(error.message);
    }
};

//----Get methods

const getMethodHandler = (id, req, res,database) => {
    getHandler(id,database).then(session => { //session must be a string
        if(!session){
            res.writeHead(400);
            res.end(`The session with id ${id} is not found.`);
        }
        else{
            if(id != null){
                res.writeHead(200);
                res.end(JSON.stringify(session));
            }
            else{
                res.writeHead(200)
                session.forEach((result) =>{
                    res.write(JSON.stringify(result));
                });
                res.end();
            }
            
        }   
    });
}
async function getHandler(id,database) {
    try{
        await client.connect();
        if(id != null){
            const result = await client.db(database).collection("testing").findOne({ session: id });
            return result;
        }
        else{
            const result = await client.db(database).collection("testing").find();
            const results = await result.toArray();
            return results;
        }
    }catch(e){
        console.error(e);
    }finally{
        await client.close();
    }
}


//---Post methods

async function postHandler(data, database){
    try{
        await client.connect();
        const result = await client.db(database).collection("testing").insertOne(data);
        console.log(`New listing created with the following id: ${result.insertedId}`);
    }catch(e){
        console.error(e);
    }finally{
        await client.close();
    }
}
async function po(res, body, database){
  try {
    let reqBody = body;
    postHandler(reqBody, database);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(reqBody));
    res.end();
    }catch(error){
        console.log(error.message);
    }
}
const getRequestBodyAndGenerateResponse = (req, res, callback,database) => {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    callback(res, JSON.parse(body), database);
  });
}
//---- DELETE

const deleteMethodHandler = (id, req, res, database) => {
  const response = deleteSession(id,database);
  res.writeHead(200);
  res.end(`The employee with id ${id} is deleted.`);
}

async function deleteSession(id, database) {
    try{
        await client.connect();
         const result = await client.db(database).collection("testing")
            .deleteOne({ session: id });
        console.log(`${result.deletedCount} document(s) was/were deleted.`);
    }catch(e){
        console.error(e);
    }finally{
        await client.close();
    }
   
}

//---PUT
const putMethodHandler = (id, req, res, database) => {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    body = JSON.parse(body);
  });
  console.log(body);
  updateSession(id, body,database);
  res.writeHead(200);
  res.end(`The Employee object with id is ${id} replaced.`);
}
async function updateSession(id, data, database) {
    try{
        await client.connect();
        const result = await client.db(database).collection("testing")
                        .updateOne({ session: id }, { $set: data });

        console.log(`${result.matchedCount} document(s) matched the query criteria.`);
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
        }catch(e){
        console.error(e);
    }finally{
        await client.close();
    }
}






const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
