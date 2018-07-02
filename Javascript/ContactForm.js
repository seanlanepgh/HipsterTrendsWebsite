//declare variables
var context;
var down = false;
var xpos;
var ypos;
//declare arrays
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
//Loads javascript on window load
window.addEventListener("load",function(e){
	signatureCanvas();
});
//Clears Canvas function
function clearArea(){
	context.clearRect(0, 0,300,100);
	context.fillStyle ="#FFFFFF";
	context.fillRect(0,0,300,100);
	//reset arrays and variables 
	clickX = new Array();
	clickY = new Array();
	clickDrag = new Array();
}
//When the page loads
function signatureCanvas(){

	//Get canvas element
	var canvas = document.getElementById("canvas");
	context = canvas.getContext('2d');
	context.fillStyle ="#FFFFFF";
	context.fillRect(0,0,300,100);
	//Detecting a click
	canvas.addEventListener("click",function(e){
		xpos =e.pageX - this.offsetLeft;
		ypos =e.pageY - this.offsetTop;
	});
	//Event for mousemove
	canvas.addEventListener("mousemove",function(e){
		
		//If mouse is down then draw
		if(down){
		addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
		draw();
		}
	});
	//Event of mouse up 
	canvas.addEventListener("mouseup",function(e){
		down = false;
		
	});
	//Event of mouse leaving the canvas
	canvas.addEventListener("mouseleave",function(e){
		
		down =false;
	});
	//Event of mouse being held down
	canvas.addEventListener("mousedown",function(e){
		down = true;
		xpos =e.pageX - this.offsetLeft;
		ypos =e.pageY - this.offsetTop;
		addClick(e.pageX -this.offsetLeft,e.pageY -this.offsetTop);
		draw();
	});
		
		
}
function addClick(x, y,down){
	//Storing previous drawings on the canvas
	clickX.push(x);
	clickY.push(y);
	clickDrag.push(down);
}
function draw(){
	context.clearRect(0, 0,300,100); // Clears the canvas
	context.lineJoin = "round";
	context.lineWidth = 5;
	context.fillStyle ="#FFFFFF";
	context.fillRect(0,0,300,100);
	context.strokeStyle = "#000000";
	// Loops through each array to draw the line	
	for(var i=0; i < clickX.length; i++) {		
		context.beginPath();
		if(clickDrag[i] && i){
		  context.moveTo(clickX[i-1], clickY[i-1]);
		}else{
		   context.moveTo(clickX[i]-1, clickY[i]);
		}
		context.lineTo(clickX[i], clickY[i]);
		context.closePath();
		context.stroke();
	}
}
