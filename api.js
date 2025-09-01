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
        res.end(JSON.stringify({url: req.url}));
        // switch(req.url){
        //     case "/static":
        //         switch(methodType){
        //             case 'GET':
        //                 res.writeHead(200);
        //                 res.end(`We received ${url} type request`);
        //                 break;
        //             case 'POST':
        //                 res.writeHead(200);
        //                 res.end(`We received ${methodType} type request`);
        //                 break;
        //             case 'PUT':
        //                 res.writeHead(200);
        //                 res.end(`We received ${methodType} type request`);
        //                 break;
        //             case 'DELETE':
        //                 res.writeHead(200);
        //                 res.end(`We received ${methodType} type request`);
        //                 break;
        //             default:
        //                 res.writeHead(404);
        //                 res.end(JSON.stringify({error: "Method not found :("}));
        //         }
        //         break
        //     default:
        //         res.writeHead(404);
        //         res.end(JSON.stringify({error: "Resource not found :("}));
        // }
        

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

const getMethodHandler = (url, req, res) => {
    const id = url.substring(1);
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
