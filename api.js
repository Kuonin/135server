const http = require("http");

const host = 'localhost';
const port = 5000;

//Test Data for the routes

const stat = JSON.stringify([
    {sessionid: 1, data: "hello world"},
    {sessionid: 2, data: "goodbye world"}
]);


const requestListener = function (req, res) {
    try{
        res.setHeader("Content-Type", "application/json");
        const methodType = req.method.toUpperCase();
        switch(req.url){
            case "/static":
                switch(methodType){
                    case 'GET':
                        res.writeHead(200);
                        res.end(`We received ${methodType} type request`);
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

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
