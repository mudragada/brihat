//Requisites
var fs = require ('fs'),
    sys = require ('sys'),
    util = require ('util'),
    EventEmitter = require('events').EventEmitter;

//File Path Constants
var pinConfig = (__dirname + '/config/pins.json'),
    gpioRootPath = '/sys/class/gpio',
    cpuInfo = '/proc/cpuinfo';

var revision = undefined;

if (fs.existsSync(cpuInfo)) {
 revision = fs.readFileSync(cpuInfo).toString().split("\n").filter(function(line) {
    return line.indexOf("Revision") == 0;
  })[0].split(":")[1].trim();
  revision = parseInt(rev, 16) < 3 ? 1 : 2;
}
var pins = require(pinConfig);




/* Constructor Gpio
gpio: number      :: Gpio PIN Identifier
 * direction: string :: 'in'/'out'/'high'/'low'
 * [edge: string]    :: [optional]'none'/'rising'/'falling'/'both'. default - 'none'
 * [options: object] :: [optional] - For Future - Additional options.
 */

function Gpio(gpio, gpioDirection, gpioEdge) {

    //private variables of the object
    this.gpio = gpio;
    this.gpioPath = gpioRootPath + 'gpio' + this.gpio + '/';
    var logPrefix = "Gpio::Pin " + this.gpio + " - ";

    // If the current instance isn't Gpio, create and return one
    if (!(this instanceof Gpio)) {
       return new Gpio(gpio, direction, edge, options);
    }

    if (!isPinExported()){
      exportGpio();
    }
    if(!isDirectionSet()){
      setDirection(gpioDirection);
    }
    if (!isEdgeSet()){
      setEdge(gpioEdge);
    }
}//end of constructor



Gpio.prototype.isExported = function() {
  return fs.existsSync(this.gpioPath);
}

Gpio.prototype.exportGpio = function(){
  fs.writeFileSync(gpioRootPath + 'export', this.gpio);
}

Gpio.prototype.isDirectionSet = function() {
  return (this.direction == 'in' || 'out');
}

Gpio.prototype.direction = function () {
  return fs.readFileSync(this.gpioPath + 'direction').toString().trim();
}

Gpio.prototype.setDirection = function (direction) {
  var directionSet = false;
  while (!directionSet) {
    try {
      tries += 1;
      fs.writeFileSync(this.gpioPath + 'direction', direction);
      directionSet = true;
    }
    catch (e) {
      if (tries === 10000) {
        console.log("Unable to set direction for " + this.gpioPath);
        throw e;
      }
    }
  }
}


Gpio.prototype.edge = function () {
    return fs.readFileSync(this.gpioPath + 'edge').toString().trim();
};
Gpio.prototype.setEdge = function (edge) {
    fs.writeFileSync(this.gpioPath + 'edge', edge);
};

Gpio.prototype.isEdgeSet = function() {
  return (edge == 'none' || 'rising' || 'falling' || 'both');
}



console.log(JSON.stringify(pins,null));
console.log(revision);

//methods of class Gpio
module.exports = Gpio;

