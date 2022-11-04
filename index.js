// READ CLIENT FILE "script.js" First.

// Intializing the app using the express module
const express =  require('express')
const app = express()

// defining the port to run either over the environement port or 8080 
const port = process.env.PORT || 8080


// use method to send the project file to the server
app.use(express.static(__dirname + '/public'));


// the response for the get request, we respond with index.html file
app.get('/', function(req,res){
    res.sendFile(__dirname+"/public/html/index.html"); // server responeding
});



// listening - server running
const server = app.listen(port, function(){

    console.log("Server is running at port: "+ port);
    
});


// Creating socket server to connect with clients
const SS = require('ws').Server;
const wss = new SS({server});

// defining value to store the last value of the range update
let value = 255;


/**
 *  on method is a method taking 2 arguments, 
 *  the first argument is the event where it could be:
 *      connection, message, close, etc...
 *  connection event is an event fires when a client first connect to the server,
 *  message event is an event fires when a client sends a message to the server,
 *  close event is an event fires when a client closes connection with the server.
 */

wss.on('connection', function(ws){
    console.log("Client Conncted");
    ws.send(value);


    /**
     *  the client will send the value of the slider to the server,
     *  the server will use the boradcast function to send this value to all clients.
     */
    ws.on('message', function(msg){
        if(msg.toString() == "Hi server"){
            console.log(msg.toString());
        }
        else{
            value = msg.toString();
            broadcast(value);
        }
        
    });

    ws.on('close', function(){
        console.log("Client disconnected");
    });
});



/**
 *  broadcast function is a function to send 
 */
function broadcast(msg){
    wss.clients.forEach(function(client){
        if(client.readyState === client.OPEN){
            client.send(msg);
        }
    });
}