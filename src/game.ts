import { Chess } from "./chess"

const game = new Chess(8, 8);

declare function io(): any;

let socket = io();
let userhashmap = {};
let socketid;

//socket.io
socket.on('userhashmap', function(msg:any){             //receive other player's info
  userhashmap = msg;                              //put the other player's info into userhashmap
});

socket.on('connect', function() {
  console.log("hello " + socket.id);
  socketid = socket.id;                           //store socket.id for use in the game

  setInterval(function() {                        //send info about your character to the server
      //if-else if for only sending data if the character has moved
      if (!(socket.id in userhashmap)) {
          socket.emit('clientinfo', ["abc"]);
      }
      
  }, 100);                                        //every 100 ms
});