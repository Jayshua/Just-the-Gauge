var Guage = function(canvas, options) {
	var options = options || {};

	// Check if we were given an id, a canvas element, or a context
	// This nice little method complements of
	// http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
	if (
    	typeof HTMLElement === "object" ? canvas instanceof HTMLElement : //DOM2
    	canvas && typeof canvas === "object" && canvas !== null && canvas.nodeType === 1 && typeof canvas.nodeName==="string" ) {

	 	// If this crazy if statement is true, we have an element (hope its a canvas, we won't check for that)
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");

	} else if( typeof canvas == "string" ) {
		// This is a string, we assume it is an ID
		this.canvas = document.getElementById(canvas);
		this.ctx = this.canvas.getContext("2d");
	} else {
		// If it isn't a canvas element or a string, we assume it is a context object
		debugger;
		this.ctx = canvas;
		this.canvas = this.ctx.canvas;
	}


	// Default radius calculation requires access to canvas, so it can't be in the default object
	if( !options.radius ) {
		var lineWidth = options.lineWidth || 20;

		if(this.canvas.width < this.canvas.height)
			options.radius = this.canvas.width/2 - lineWidth / 2;
		else
			options.radius = this.canvas.height/2 - lineWidth / 2;

	}

	// Merge options and default options, assign them to "this"	
	for( var key in this.defaultOptions ) {
		if( typeof options[key] == "undefined") options[key] = this.defaultOptions[key];
		this[key] = options[key];
	}


	this.startTime = Date.now();

	this.render();
};

Guage.prototype.defaultOptions = {
	color: "lightblue",
	bgColor: "#eee",
	lineWidth: 20,

	text: {
		font: (canvas.height/5) + "px Arial",
		align: "center",
		baseline: "middle",
		x: canvas.width/2,
		y: canvas.height/2,
		transform: function(value) { return Math.round(value*100) + "%"; }
	},

	easing: "easeOutSine",
	duration: 5000,

	from: 0,
	to: 1,

	// This isn't actually the default radius, it's just a placeholder
	// The default radius is calculated in the instantiation function
	radius: 20,

	arcStart: Math.PI*3/4,
	arcLength: Math.PI*6/4,
	counterClockwise: false,

	x: canvas.width/2,
	y: canvas.height/2,

	running: true
};

Guage.prototype.render = function() {
	var ctx = this.ctx;
	var now = Date.now();
	var ellapsed = now - this.startTime;

	// Update Value
	this.currentValue = this.ease[this.easing]( ellapsed, this.from, this.to-this.from, this.duration )

	// Clear Canvas
	ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

	// Draw guage background
	ctx.strokeStyle = this.bgColor;
	ctx.lineWidth = this.lineWidth;
	ctx.beginPath();
	ctx.arc(
		this.x, this.y,
		this.radius,

		this.arcStart, this.arcStart+this.arcLength,

		this.counterClockwise
	);
	ctx.stroke();

	// Draw guage position
	ctx.strokeStyle = this.color;
	ctx.lineWidth = this.lineWidth;
	ctx.beginPath();
	ctx.arc(
		this.x, this.y,
		this.radius,

		this.arcStart, this.arcStart+(this.arcLength*this.currentValue),

		this.counterClockwise
	);
	ctx.stroke();

	// Draw Text
	ctx.fillStyle = this.color;
	ctx.font = this.text.font;
	ctx.textAlign = this.text.align;
	ctx.textBaseline = this.text.baseline;
	
	var text = this.text.transform(this.currentValue);
	ctx.fillText(text, this.text.x, this.text.y);

	if( ellapsed < this.duration && this.running == true )
		window.requestAnimationFrame( this.render.bind(this) );
};

Guage.prototype.setValue = function(newValue) {
	this.from = this.currentValue;
	this.to = newValue;
	this.startTime = Date.now();

	this.render();
};

Guage.prototype.freeze = function() {
	this.running = false;
};
Guage.prototype.thaw = function() {
	this.running = true;
};
// Those perhaps aren't the best names... So let's alias them.
Guage.prototype.stop = Guage.prototype.freeze;
Guage.prototype.start = Guage.prototype.thaw;