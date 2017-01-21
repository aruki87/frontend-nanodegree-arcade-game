var TILE_WIDTH = 101,
    TILE_HEIGHT = 83;

// Enemies player must avoid
var Enemy = function(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.originalY = y;
};

// Checks if player has made contact with an enemy object
// Updates each enemies position
Enemy.prototype.update = function(dt) {
    this.checkCollisions(allEnemies);
    if (this.x >= 505) {
        this.reset();
    } else {
        this.x += this.speed * dt * 2;
    }
};

// Reset method for enemy after reaching right-side of canvas
Enemy.prototype.reset = function() {
    this.x = Math.random() * -45;
    this.y = this.originalY;
};

// Draws the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function(x, y) {
    this.x = x;
    this.y = y;
};

// Draws the player character on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Checks if player has made contact with an enemy object
Enemy.prototype.checkCollisions = function() {
    var playerTop = player.y;
    var playerBottom = player.y + 70;
    var playerRight = player.x + 98;
    var playerLeft = player.x;
    var enemyTop = this.y;
    var enemyBottom = this.y + 70;
    var enemyRight = this.x + 70;
    var enemyLeft = this.x + 35 ;
    if ((playerTop <= enemyBottom) && (playerBottom >= enemyTop) && (playerLeft <= enemyRight) && (playerRight >= enemyLeft)) {
        player.reset();
        allEnemiesReset();
        }
    };


// Player reset method
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 400;
};



// Handles input and moves character on screen
Player.prototype.handleInput = function(code) {

            if (code === 'up') {
                this.y -= TILE_HEIGHT;

            if (this.y < 0) {
                this.reset();
                allEnemiesReset();
            }
            }

            if ((code === 'down') && ((this.y + TILE_HEIGHT) < 415) ) {
                this.y += TILE_HEIGHT;
            }
            if ((code === 'left') && (this.x > 0) ) {
                this.x -= TILE_WIDTH;
            }
            if ((code === 'right') && (this.x < 404) ) {
                this.x += TILE_WIDTH;
            }
};

// Resets enemies during level finish
function allEnemiesReset() {
    for (var i = 0; i < allEnemies.length; i++) {
        allEnemies[i].reset();
        }
    }


// Below is the instantiation of all game objects
// All enemy objects are in an array called allEnemies
var allEnemies = [];
var enemyOne = new Enemy(20, 60, 90, 70, 55);
var enemyTwo = new Enemy(200, 140, 90, 70, 70);
var enemyThree = new Enemy(100, 225, 90, 70, 90);


allEnemies.push(enemyOne);
allEnemies.push(enemyTwo);
allEnemies.push(enemyThree);

var player = new Player(202,400);

// Adds characters to screen
// Starts the game
var pickCharacter = (function(global) {
    var doc = global.document,
        win = global.window,
        charPicker = doc.createElement('div');
        var pickTitle =  doc.createElement('h2');
        var text = document.createTextNode("Pick your character");
        pickTitle.appendChild(text);
        charPicker.appendChild(pickTitle);

    // Sets chosen character as player
    var addCharacter = function(src){
        var char =  doc.createElement('img');
        var charSrc = doc.createAttribute('src');
        charSrc.value = src;
        char.setAttributeNode(charSrc);

        char.addEventListener("click", function() {
            player.sprite = src;
            var EngineInstance = Engine(global);
            doc.body.removeChild(charPicker);
        });

        charPicker.appendChild(char);
    }

    addCharacter('images/char-boy.png');
    addCharacter('images/char-cat-girl.png');
    addCharacter('images/char-horn-girl.png');
    addCharacter('images/char-pink-girl.png');
    addCharacter('images/char-princess-girl.png');

    doc.body.appendChild(charPicker);
})(this);