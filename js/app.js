// player"s score
let yourScore = 0;
let scoreCounter = document.getElementById("score");


// Enemies our player must avoid
let Enemy = function(x, y, speed) {
    this.sprite = "images/enemy-bug.png"; // The Enemy image/sprite
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy"s position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x+(this.speed*dt);

//Randomize speeds of enemies as they re-enter the board
      if (this.x >= 505) {
          this.x = -60;
          this.speed = 100 + Math.floor((Math.random() * 100) + 1);
      }

//handling collision with the enemies
      if (this.x < player.x + 60 &&
      this.x + 60 > player.x &&
      this.y < player.y + 40 &&
      40 + this.y > player.y){
        player.toStart();
        yourScore -= 1;
        scoreCounter.textContent = `Your score: ${yourScore}`;
          if (yourScore <= 0) {
              player.toStart();
              yourScore = 0;
              scoreCounter.textContent = `Your score: ${yourScore}`;
              lose();
          }
      }
  };


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// the Player Object
let Player = function(x,y){
    this.sprite = "images/char-boy.png"; // The Player image/sprite
    this.x = x;
    this.y = y;
};

// This class requires an update(), render() and a handleInput() method.
Player.prototype.update = function(dt) {
  if (this.x > 400) {
      this.x = 400;
  }
  if (this.x < 0) {
      this.x = 0;
  }
  if (this.y > 400) {
      this.y = 400;
  }
  if (this.y < 0) {
      this.y = 0;

      player.toStart();
      yourScore += 1;
      scoreCounter.textContent = `Your score: ${yourScore}`;
      if (yourScore >= 10) {
          win();
      };
    }
};


Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.handleInput = function(rcv){
    if( rcv === "left" && this.x > 0 )
        this.x = this.x - 40;
    else if( rcv === "right" && this.x < 400)
        this.x = this.x + 40;
    else if( rcv === "up" && this.y > -50)
        this.y = this.y - 40;
    else if( rcv === "down" && this.y < 400)
        this.y = this.y + 40;
};


Player.prototype.toStart = function() {
    this.x = 200;
    this.y = 400;
};


// Now instantiate your objects.
let allEnemies = [new Enemy(-0,60, 60),new Enemy(-40,60, 120), new Enemy(-80, 140, 80), new Enemy(0,220, 120)];

let player = new Player(200,400);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don"t need to modify this.
document.addEventListener("keyup", function(e) {
    const allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// message if player wins
function win() {
  const playAgain = confirm(`CONGRATULATIONS, YOU WIN!
    Your final score: ${yourScore}.
Click below to close this window and reload page to play again!`);
  if (playAgain == true){
    player.onStart();
    yourScore = 0;
  } else {
  return("thank you for playing!")};
}

// message if player loses
function lose() {
  const playAgain = confirm(`GAME OVER! YOU LOST!
Click below to close this window and reload page to play again!`);
  if (playAgain == true){
    player.onStart();
    yourScore = 0;
  } else {
  return("thank you for playing!")};
}
