const PUZZLE_X = 117;
const PUZZLE_Y = 38;
const POSITIONS = [
    [{x:0, y:0}, {x:122, y:0}, {x:244, y:0}],
    [{x:0, y:122}, {x:122, y:122}, {x:244, y:122}],
    [{x:0, y:244}, {x:122, y:244}, {x:244, y:244}],
]
const EMPTY = [0,0,8,8,0,2,0,2,0] //Location of the initial empty square in each puzzle

class mainScene extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.spritesheet('puzzle1', 'assets/puzzle1.png', { frameWidth: 122, frameHeight: 122 });
    }

    create() {
        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        var puzzle_id = 0;
        var puzzle = `puzzle${puzzle_id + 1}`
        this.cur_pos = {x:(EMPTY[puzzle_id]/3), y:(EMPTY[puzzle_id]%3)}

        this.add.image(320, 240, 'background');
        this.pieces = []
        
        for (let i = 0; i < 3; i++) {
            var row = []
            for (let j = 0; j < 3; j++) {
                row.push(this.add.sprite(PUZZLE_X + POSITIONS[i][j].x, PUZZLE_Y + POSITIONS[i][j].y, puzzle, (i*3 + j)).setOrigin(0));
            }
            this.pieces.push(row);
        }
    }

    update() {
        var moving = false;
        var new_pos;
        if (Phaser.Input.Keyboard.JustDown(this.left) && this.cur_pos.y != 2) {
            new_pos = {x: this.cur_pos.x, y: this.cur_pos.y + 1}
            moving = true;
        } else if (Phaser.Input.Keyboard.JustDown(this.right) && this.cur_pos.y != 0) {
            new_pos = {x: this.cur_pos.x, y: this.cur_pos.y - 1}
            moving = true;
        } else if (Phaser.Input.Keyboard.JustDown(this.up) && this.cur_pos.x != 2) {
            new_pos = {x: this.cur_pos.x + 1, y: this.cur_pos.y}
            moving = true;
        } else if (Phaser.Input.Keyboard.JustDown(this.down) && this.cur_pos.x != 0) {
            new_pos = {x: this.cur_pos.x - 1, y: this.cur_pos.y}
            moving = true;
        } 

        if(moving) {
            var blank_piece = this.pieces[this.cur_pos.x][this.cur_pos.y];
            var new_piece = this.pieces[new_pos.x][new_pos.y];
            new_piece.x = PUZZLE_X + POSITIONS[this.cur_pos.x][this.cur_pos.y].x;
            new_piece.y = PUZZLE_Y + POSITIONS[this.cur_pos.x][this.cur_pos.y].y;
            blank_piece.x = PUZZLE_X + POSITIONS[new_pos.x][new_pos.y].x;
            blank_piece.y = PUZZLE_Y + POSITIONS[new_pos.x][new_pos.y].y;
            this.pieces[this.cur_pos.x][this.cur_pos.y] = new_piece;
            this.pieces[new_pos.x][new_pos.y] = blank_piece;
            this.cur_pos.x = new_pos.x;
            this.cur_pos.y = new_pos.y;
        }
    }
}

window.onload = function() {
    var config = {
        width: 640,
        height: 480,
        backgroundColor: 0x000000,
        scene: [mainScene],
    }

    var game = new Phaser.Game(config);
}