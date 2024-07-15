const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this._field = field;
    this._vertical = 0;
    this._horizontal = 0;
    this._direction = "";
    this._terminate = false;
  }
  //  getters
  get field() {
    return this._field;
  }

  get vertical() {
    return this._vertical;
  }

  get horizontal() {
    return this._horizontal;
  }

  get direction() {
    return this._direction;
  }

  get terminate() {
    return this._terminate;
  }

  // setters
  set field(newField) {
    this._field = newField;
  }

  set vertical(newVertical) {
    this._vertical = newVertical;
  }

  set horizontal(newHorizontal) {
    this._horizontal = newHorizontal;
  }

  set direction(newDirection) {
    this._direction = newDirection;
  }

  set terminate(terminate) {
    this._terminate = terminate;
  }

  // other methods
  print() {
    this.field.forEach((row) => console.log(row.join("")));
  }

  getDirection() {
    let direction = prompt(
      "Which direction would you like to move? (r=right, l=left, u=up, d=down)"
    );
    if (["r", "l", "u", "d"].includes(direction.toLowerCase())) {
      this.direction = direction;
    } else {
      console.log('Try again with a valid direction.');
      this.getDirection();
    }
  }

  updateCharacter() {
    this.field[this.vertical][this.horizontal] = pathCharacter;
  }

  updateLocation() {
    if (this.direction === "r") {
      this.horizontal++;
      this.checkLocation();
      if (!this.terminate) {
        this.updateCharacter();
      }
    } else if (this.direction === "l") {
      this.horizontal--;
      this.checkLocation();
      if (!this.terminate) {
        this.updateCharacter();
      }
    } else if (this.direction === "u") {
      this.vertical--;
      this.checkLocation();
      if (!this.terminate) {
        this.updateCharacter();
      }
    } else if (this.direction === "d") {
      this.vertical++;
      this.checkLocation();
      if (!this.terminate) {
        this.updateCharacter();
      }
    }
  }

  checkLocation() {
    try {
      const char = this.field[this.vertical][this.horizontal];
      if (char === hat) {
        console.log("Yay, you found the hat!");
        this.terminate = true;
      } else if (char === hole) {
        console.log("Yikes, you fell in a hole!");
        this.terminate = true;
      }
    } catch (e) {
      console.log("You're out of bounds");
      this.terminate = true;
    }
  }

  runGame() {
    while (this.terminate === false) {
      this.print();
      this.getDirection();
      this.updateLocation();
    }
  }

  static generateField(height, width, percentage) {
    const totalSpots = height * width;
    const totalHoles = Math.round(totalSpots * percentage);

    // create field skeleton
    const finalField = new Array(height)
      .fill(0)
      .map((el) => new Array(width).fill(fieldCharacter));

    // place the start of the path
    finalField[0][0] = pathCharacter;

    // randomly place characters
    // place hat
    let row = Math.floor(Math.random() * height);
    let column = Math.floor(Math.random() * width);
    if (finalField[row][column] === fieldCharacter) {
      finalField[row][column] = hat;
    }

    // place holes
    let holesPlaced = 0;
    while (holesPlaced < totalHoles) {
      row = Math.floor(Math.random() * height);
      column = Math.floor(Math.random() * width);

      if (finalField[row][column] === fieldCharacter) {
        finalField[row][column] = hole;
        holesPlaced++;
      }
    }
    return finalField;
  }
}

//  testing
// const myField = new Field([
//   ["*", "░", "O"],
//   ["░", "O", "░"],
//   ["░", "^", "░"],
// ]);

const myField = new Field(Field.generateField(5, 5, 0.2));
myField.print();
myField.runGame();
