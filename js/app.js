'use strict';
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = Math.floor(300 + Math.random() * 300);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Loop enemies on the canvas
    if (this.x >= 505){
        this.x = 0;
    }

    // Collision check between player and enemies
    if (player.y >= this.y - 20 && player.y <= this.y + 20 && player.x >= this.x - 20 && player.x <= this.x +20) {
        player.newGame();
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

// Update Player's position
Player.prototype.update = function(dt) {
    this.x + this.speed * dt;
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Allows player to move, restrict movement of the player  only to the canvas + winning alert if on the water.
Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        this.x -= this.speed + 52;
        if (this.x <= 0){
            this.x = 0;
        }
    }
    if (keyPress == 'up') {
        this.y -= this.speed + 35;
        if (this.y <= 0){
            alert('YOU WON!')
            this.newGame();
        }
    }
    if (keyPress == 'right') {
        this.x += this.speed + 52;
        if (this.x >= 400){
            this.x = 400;
        }
    }
    if (keyPress == 'down') {
        this.y += this.speed + 35;
        if (this.y >= 383) {
            this.y = 383;
        }
    }
    console.log(keyPress);
};

// Resets game to the beggining
Player.prototype.newGame = function() {
    this.x = 202;
    this.y = 383;
};


// Now instantiate your objects.
var enemyOne = new Enemy(0, 50);
var enemyTwo = new Enemy(0, 130);
var enemyThree = new Enemy(0, 210);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemyOne, enemyTwo, enemyThree];

// Place the player object in a variable called player
var player = new Player(202, 383, 50);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
