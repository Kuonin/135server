const http = require("http");

const host = 'localhost';
const port = 5000;

//Test Data for the routes

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
        

    }catch (error){
        res.writeHead(400);
        res.end(error.message);
    }
    // switch(req.url){
    //     case "/static":
    //         res.writeHead(200);
    //         res.end(stat);
    //         break
    //     default:
    //         res.writeHead(404);
    //         res.end(JSON.stringify({error: "Resource not found :("}));
    // }
    // res.writeHead(200);
    // res.end(`{"message": "This is a JSON response"}`);
};

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
