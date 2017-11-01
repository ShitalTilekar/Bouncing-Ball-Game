// Create our 'main' state that will contain the game
var mainState = {
   preload: function() { 
    // Load the ball sprite
    game.load.image('ball', 'assets/4.png'); 
       game.load.image('pipe', 'assets/pipe.png');
       game.load.audio('jump', 'assets/jump.wav'); 
	
	game.load.image('background', 'assets/7.jpg');
},

create: function() { 
    this.jumpSound = game.add.audio('jump');

	this.background = game.add.tileSprite(0,0,1300,1500,"background");




    // Change the background color of the game to blue
//    game.stage.backgroundColor = '#71c5cf';
	//game.add.sprite('back');	
	//document.body.style.backgroundImage = "url('back')";
    // Set the physics system
		//back = game.add.sprite(0, 0, 'back');
		//back.scale.setTo(4,4);
	//	game.physics.enable(back, Phaser.Physics.ARCADE);
	//back.body.gravity.x = 200;
   // game.physics.startSystem(Phaser.Physics.ARCADE);

    // Display the ball at the position x=100 and y=245
    this.ball = game.add.sprite(100, 245, 'ball');

    // Add physics to the ball
    // Needed for: movements, gravity, collisions, etc.
    game.physics.arcade.enable(this.ball);

    // Add gravity to the ball to make it fall
    this.ball.body.gravity.y = 1000;  

    // Call the 'jump' function when the spacekey is hit
    var spaceKey = game.input.keyboard.addKey(
                    Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);    
    // Create an empty group
this.pipes = game.add.group(); 
    this.timer = game.time.events.loop(1500, this.addRowOfPipes, this); 
    this.score = -1;
var scoreText;
scoreText = game.add.text(16, 16, 'score: ', { fontSize: '32px', fill: '#000' });
this.labelScore = game.add.text(120, 17, "0", 
    { fontSize: '32px', fill: '#000' }); 
    // Move the anchor to the left and downward
this.ball.anchor.setTo(-0.2, 0.5); 
},

update: function() {

	this.background.tilePosition.x += 1;
    // If the ball is out of the screen (too high or too low)
    // Call the 'restartGame' function
    if (this.ball.y < 0 || this.ball.y > 490)
        this.restartGame();
    game.physics.arcade.overlap(
    this.ball, this.pipes, this.restartGame, null, this);
    if (this.ball.angle < 20)
    this.ball.angle += 1; 
    game.physics.arcade.overlap(
    this.ball, this.pipes, this.hitPipe, null, this); 
},

  // Make the ball jump 
jump: function() {
    this.jumpSound.play();
    if (this.ball.alive == false)
    return; 
    // Add a vertical velocity to the ball
    this.ball.body.velocity.y = -350;
    // Create an animation on the ball
var animation = game.add.tween(this.ball);

// Change the angle of the ball to -20° in 100 milliseconds
animation.to({angle: -20}, 100);

// And start the animation
animation.start(); 
},

// Restart the game
/*restartGame: function() {
    // Start the 'main' state, which restarts the game
    	game.state.start('main');
},*/
    addOnePipe: function(x, y) {
    // Create a pipe at the position x and y
    var pipe = game.add.sprite(x, y, 'pipe');

    // Add the pipe to our previously created group
    this.pipes.add(pipe);

    // Enable physics on the pipe 
    game.physics.arcade.enable(pipe);

    // Add velocity to the pipe to make it move left
    pipe.body.velocity.x = -200; 

    // Automatically kill the pipe when it's no longer visible 
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
},
    addRowOfPipes: function() {
    // Randomly pick a number between 1 and 5
    // This will be the hole position
    var hole = Math.floor(Math.random() * 5) + 1;

    // Add the 6 pipes 
    // With one big hole at position 'hole' and 'hole + 1'
    for (var i = 0; i < 8; i++)
        if (i != hole && i != hole + 1) 
            this.addOnePipe(400, i * 60 + 10); 
        this.score += 1;
this.labelScore.text = this.score;  
},
    hitPipe: function() {
    // If the ball has already hit a pipe, do nothing
    // It means the ball is already falling off the screen
    if (this.ball.alive == false)
        return;

    // Set the alive property of the ball to false
    this.ball.alive = false;

    // Prevent new pipes from appearing
    game.time.events.remove(this.timer);

    // Go through all the pipes, and stop their movement
    this.pipes.forEach(function(p){
        p.body.velocity.x = 0;
    }, this);
}, 

};
/*warn: function() {
	alert ("Game Over....!!!");
               //document.write ("This is a warning message!");
},
};*/	



// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(1300, 1500);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState); 

// Start the state to actually start the game
game.state.start('main');

//Game over
//game.state.alert('Game Over...!!');


/*<html>
   <head>
   
      <script type="text/javascript">
         <!--
            function Warn() {
               alert ("This is a warning message!");
               document.write ("This is a warning message!");
            }
         //-->
      </script>
      
   </head>
   <body>
      <p>Click the following button to see the result: </p>
      
      <form>
         <input type="button" value="Click Me" onclick="Warn();" />
      </form>
      
   </body>
</html>*/
