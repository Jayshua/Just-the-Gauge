var Gauge = function(canvas, options) {
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




	var defaultOptions = {
		color: "lightblue",
		bgColor: "#eee",
		lineWidth: 20,

		textOffsetX: 0,
		textOffsetY: 0,
		textFont: (this.canvas.height/5) + "px Arial",
		textColor: options.color || "lightblue",
		textAlign: "center",
		textBaseline: "middle",
		textTransform: function(value) { return Math.round(value*100) + "%"; },

		easing: "easeOutSine",
		duration: 5000,

		from: 0,
		to: 1,

		radius: (function() {
			var lineWidth = options.lineWidth || 20;

			if(this.canvas.width < this.canvas.height)
				return this.canvas.width/2 - lineWidth / 2;
			else
				return this.canvas.height/2 - lineWidth / 2;
		}()),

		arcStart: Math.PI*3/4,
		arcLength: Math.PI*6/4,
		counterClockwise: false,

		x: this.canvas.width/2,
		y: this.canvas.height/2,

		running: true
	};

	// Merge options and default options, assign them to "this"	
	for( var key in defaultOptions ) {
		if( typeof options[key] == "undefined") options[key] = defaultOptions[key];
		this[key] = options[key];
	}


	this.startTime = Date.now();
 
	this.render();
};



Gauge.prototype.render = function() {
	var ctx = this.ctx;
	var now = Date.now();
	var ellapsed = now - this.startTime;

	// Update Value
	this.currentValue = this.ease[this.easing]( ellapsed, this.from, this.to-this.from, this.duration )

	// Clear Canvas
	var bounding = this.radius + (this.lineWidth/2);
	ctx.clearRect( this.x - bounding, this.y - bounding, this.x + bounding, this.y + bounding);

	// Draw gauge background
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

	// Draw gauge position
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
	ctx.fillStyle = this.textColor;
	ctx.font = this.textFont;
	ctx.textAlign = this.textAlign;
	ctx.textBaseline = this.textBaseline;
	
	var text = this.textTransform(this.currentValue);
	ctx.fillText(text, this.textOffsetX + this.x, this.textOffsetY + this.y);

	if( ellapsed < this.duration && this.running == true )
		window.requestAnimationFrame( this.render.bind(this) );
};

Gauge.prototype.setValue = function(newValue) {
	this.from = this.currentValue;
	this.to = newValue;
	this.startTime = Date.now();

	this.render();
};

Gauge.prototype.freeze = function() {
	this.running = false;
};
Gauge.prototype.thaw = function() {
	this.running = true;
};
// Those perhaps aren't the best names... So let's alias them.
Gauge.prototype.stop = Gauge.prototype.freeze;
Gauge.prototype.start = Gauge.prototype.thaw;