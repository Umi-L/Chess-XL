import express from "express";
import { Socket } from "socket.io";
import { Chess, Peice, Peices, Color } from "../shared/chess";
import { IMove, IState } from "../shared/messages";
import { Vector2 } from "../shared/utils";

//-----------Networking------------

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var usercount = 0;
var userhashmap = {};                                   //stores client information
var port = process.env.PORT || 3000;                    //heroku port or default port 3000

//game values
const game = new Chess(12,8);

game.board.peices.push({type: Peices.Queen, pos: new Vector2(0,0), color: Color.White} as Peice)

app.get('/', function(req, res){                        //response handler
    res.sendFile(__dirname + '/index.html');            //default response
});

app.use('/dist', express.static('dist/client'));           //serve the assets folder
app.use('/dist', express.static('dist/shared'));           //serve the assets folder
app.use('/assets', express.static('assets'));                   //serve the js folder
app.use('/assets/peices', express.static('assets/peices'));                   //serve the js folder

//404
app.use(function(req, res, next) {                      //404 response handler
    res.status(404).send('404: Sorry cant find that!'); //basic 404 response
});


io.on('connection', function(socket:any){                   //socket.io on connection to client

    function communicateJoin(status: string) {                  //function for handling socket io connections
        if (status == '+') {                            //status just checks if you want the function to handle a join
                                                        //or a leave
            usercount += 1;                             //if a user joins add 1 to the usercount
        } else if (status == '-') {
            usercount -= 1;
            delete userhashmap[socket.id as keyof Object];              //get rid of the info of the logged in socket when they leave
        }
        console.log(status + socket.id);
        console.log("users: " + usercount);

        for (var x in userhashmap) {                    //list connected sockets whenever someone leaves or joins
            console.log(" |  " + x);
        }
    }

    function sendClientInfo(){
        io.sockets.socket(socket.id).emit("clientInfo")
    }

    function shareState(){
        socket.emit("state", {board: game.board, turn: game.turn} as IState);
        console.log(game.board.peices);
    }

    communicateJoin("+");                               //someone joins on io.on('connection', ...

    shareState();
    

    // setInterval(function () {                           //send out the list of connected sockets to all sockets
    //     if (usercount > 0) {
    //         socket.emit('userhashmap', userhashmap);
    //     }
    // }, 100);                                            //every 100 ms

    socket.on('disconnect', function() {                //someone leaves on socket.on('disconnect', ...

        communicateJoin("-");

    });

    socket.on('move', (move: IMove)=>{

        //if valid move make move then emit
        if (game.move(move)){
            shareState();
        }
    });
});

//http serving
http.listen(port, function(){
    console.log('listening on ' + port);
});