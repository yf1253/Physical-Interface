let serial;                             // variable to hold an instance of the serialport library
let incomingData;                             // for incoming serial data
let portName = '/dev/tty.usbmodem2101'; //// my serial port name. Changed from cu to tty.

let dataMode;
let buttonData;
let potentiometerData;

let column = 10;
    row = 10;
let dancer1;
let dancer2;
let dancer3;
let dancer4;

function setup() {
  createCanvas(600, 600);
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);       // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing

  serial.list();                      // list the serial ports
  serial.openPort(portName);              // open a serial port
  
  
  dancer1 = new dancer(0, 0);
  dancer2 = new dancer(-150, 0);
  dancer3 = new dancer(80, 0);
  dancer4 = new dancer(-80, 0);
}


// make a serial port selector object:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    console.log(i + " " + portList[i]);
}
}

function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  // read a byte from the serial port, convert it to a number:
  let inString = serial.readLine();

  if(inString.length <= 0) return;

  if (inString === "potentiometer") {
    dataMode = "potentiometer"
  } else if(inString === "button") {
    dataMode = "button"
  } else if(dataMode === "potentiometer") {
    potentiometerData = inString
  } else if (dataMode === "button") {
    buttonData = inString
  }

 incomingData = inString
}

const softCopy = (i) => i

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}


function draw() {
  // black background, white text:
  background(0);

   for (let x = 0; x < column; x++) {
    for (let y = 0; y < row; y++) {
      fill(potentiometerData, random(255), 220);
      if (buttonData == 0){
        ellipse(
          (width / column) * x + 30,
          (height / column) * y + 30,
          potentiometerData / column - 60
        )
      } else {
        push();
        fill(random(255),potentiometerData, 220);
        rectMode(CENTER)
        rect((width / column) * x + 30, (height / column) * y + 30, potentiometerData / column - 60, potentiometerData / column - 60)
        pop();
      }
    }
  }

  //spotlight outline
  fill(255, 255, potentiometerData);//random(255)
  beginShape();
  vertex(80, 600);
  vertex(280, 0);
  vertex(320, 0);
  vertex(520, 600);
  endShape();
  //spotlight purple bg
  fill(137, random(potentiometerData), 220);//random(140)
  beginShape();
  vertex(90, 600);
  vertex(290, 0);
  vertex(310, 0);
  vertex(510, 600);
  endShape();
  //spotlight bottom circle
  fill(225, random(224), 255); 
  ellipse(300, 610, 420, 150);

  dancer1.move();
  dancer1.show();
  dancer2.move();
  dancer2.show();
  dancer3.move();
  dancer3.show();
  dancer4.move();
  dancer4.show();
  
}

class dancer {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move() {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-0.3, 0.3);
  }

  show() {
    noStroke();
    push();
    fill(10);
    //left leg
    rect(this.x + 305, this.y + 550, 5, 20, 50);
    //right leg
    rect(this.x + 320, this.y + 550, 5, 20, 50);
    //left arm
    rect(this.x + 290, this.y + 530, 20, 5, 50);
    //right arm
    rect(this.x + 320, this.y + 530, 20, 5, 50);
    //body
    noStroke();
    fill(241, 194, 51);
    rect(this.x + 300, this.y + 500, 30, 60, 50);
    //body bottom
    noStroke();
    fill(43, 154, 205);
    rect(this.x + 300, this.y + 540, 30, 20, 0);
    //left eye
    fill(255);
    stroke("#222222");
    strokeWeight(4);
    circle(this.x + 306, this.y + 520, 15);
    //right eye
    fill(255);
    stroke("#222222");
    strokeWeight(4);
    circle(this.x + 324, this.y + 520, 15);
    pop();
  }
}




