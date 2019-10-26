let allEnemies = [];
let player;
let winningModal = document.querySelector('.modal.winning');

// Enemies our player must avoid
var Enemy = function (x, y) {
    this.sprite = 'images/enemy-bug.png'; 
    this.x = x;
    this.y = y;
    this.speed = randomNum();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    this.x = this.x + dt * this.speed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 75);
};

// Player of our arcade game
class Player {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }

    // Checks whether the player has hit an enemy
    update() {
        for (const enemy of allEnemies) {
            if (checkCollision(player, enemy)) {
                player = new Player(this.sprite, 2, 5);
            }
        }
    }

    // Renders our player
    render() {
        if (this.sprite) {
            ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 75);
        }
    }

    // Moves the player in the inputted direction
    handleInput(direction) {
        if (direction === 'left') {
            if (this.x !== 0) {
                this.x--;
            }
        }
        else if (direction === 'up') {
            if (this.y !== 0) {
                this.y--;
            }
            // If the player has reached the water
            if (this.y === 0) {
                player = new Player(player.sprite, 2, 5);
                openWinning();
            }
        }
        else if (direction === 'right') {
            if (this.x !== 4) {
                this.x++;
            }
        }
        else {
            if (this.y !== 5) {
                this.y++;
            }
        }
    }
}

// Runs after the window has loaded
window.onload = function startGame() {
    openSelection();    // Opens the sprite selection

    // Generate the enemies every half second
    setInterval(function () {
        allEnemies.push(new Enemy(0, randomNum()));
    }, 500);
};
player = new Player();

// Add event listener to close the winning modal
document.querySelector('.close-button').addEventListener('click', function() {
    winningModal.classList.toggle('show-modal'); 
});
// Add event listener for key presses
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

// Generates a random number between 1 and 3
const randomNum = () => Math.floor(Math.random() * 3) + 1;

// Checks for collisions
function checkCollision(player, enemy) {
    const errorMargin = 0.3;
    if (Math.abs(player.x - enemy.x) <= errorMargin && Math.abs(player.y - enemy.y) <= errorMargin) {
        return true;
    }
    return false;
}

// Opens the sprite selection modal
function openSelection() {
    let selectionModal = document.querySelector('.modal.selection');
    selectionModal.classList.toggle('show-modal');

    // Add event listener for sprites
    document.getElementById('sprite-selection').addEventListener('click', function (e) {
        player = new Player(e.target.id, 2, 5);
        selectionModal.classList.toggle('show-modal');
    });
}

// Opens the winning modal
function openWinning() {
    winningModal.classList.toggle('show-modal');
    
}