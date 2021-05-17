var getArea = function() {
    return this.width * this.height;
}

function Rectangle(width, height) {
    this.width = width;
    this.height = height;
}

function Square(width) {
    this.width = width;
    this.height = width;
}

Rectangle.prototype.getArea = getArea;
Square.prototype.getArea = getArea;

var rect = new Rectangle(4, 5);
console.log(rect); //20
console.log(rect.getArea());

var square = new Square(4);
console.log(square);
console.log(square.getArea()); //16
