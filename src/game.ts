import { Chess } from "./chess"

declare var netplayjs: any;

const game = new Chess(8,8);

class SimpleGame extends netplayjs.Game {
    // In the constructor, we initialize the state of our game.
    constructor() {
      super();
      // Initialize networked vars
      
      this.aPos = {x: 0, y: 0};
      this.bPos = {x: 20, y:50};
    }
  
    // The tick function takes a map of Player -> Input and
    // simulates the game forward. Think of it like making
    // a local multiplayer game with multiple controllers.
    tick(playerInputs:any) {
      for (const [player, input] of playerInputs.entries()) {
        //Generate player velocity from input keys.
        const vel = {
          x:
            (input.pressed.ArrowLeft ? -1 : 0) +
            (input.pressed.ArrowRight ? 1 : 0),
          y:
            (input.pressed.ArrowDown ? -1 : 0) +
            (input.pressed.ArrowUp ? 1 : 0),
        };
  
        //Apply the velocity to the appropriate player.
        if (player.getID() == 0) {
          this.aPos.x += vel.x * 5;
          this.aPos.y -= vel.y * 5;
        } else if (player.getID() == 1) {
          this.bPos.x += vel.x * 5;
          this.bPos.y -= vel.y * 5;
        }
      }
    }
  
    // Normally, we have to implement a serialize / deserialize function
    // for our state. However, there is an autoserializer that can handle
    // simple states for us. We don't need to do anything here!
    // serialize() {}
    // deserialize(value) {}
  
    // Draw the state of our game onto a canvas.
    draw(canvas:HTMLCanvasElement) {
      const ctx = canvas.getContext("2d")!;
  
      // Fill with black.
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      //Draw squares for the players.
      ctx.fillStyle = "red";
      ctx.fillRect(this.aPos.x - 5, this.aPos.y - 5, 10, 10);
      ctx.fillStyle = "blue";
      ctx.fillRect(this.bPos.x - 5, this.bPos.y - 5, 10, 10);
    }
  }
  
  SimpleGame.timestep = 1000 / 60; // Our game runs at 60 FPS

  const updateCanvasSize = () => {
    SimpleGame.canvasSize = { width: window.innerWidth, height: window.innerHeight };
  }

  updateCanvasSize();
  window.onresize = updateCanvasSize;
  
  // Because our game can be easily rewound, we will use Rollback netcode
  // If your game cannot be rewound, you should use LockstepWrapper instead.
  new netplayjs.RollbackWrapper(SimpleGame).start();