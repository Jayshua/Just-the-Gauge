var Guage = function(canvas, options) {
	var options = options || {};
	var defaultOptions = {
		color: "lightblue",
		bgColor: "#eee",
		lineWidth: 20,

		text: {
			font: (canvas.height/5) + "px Arial",
			align: "center",
			baseline: "middle",
			identifier: "%",
			x: canvas.width/2,
			y: canvas.height/2
		},

		easing: "easeOutSine",
		duration: 5000,

		from: 0,
		to: 1,

		radius: (function() {
			// Default radius calculation is too complex for one line... Well, it *could* be done. But let's not go there.
			var lineWidth = options.lineWidth || 20;

			if(canvas.width < canvas.height)
				return canvas.width/2 - lineWidth/2;
			else
				return canvas.height/2 - lineWidth/2;
		})(),

		arcStart: Math.PI*3/4,
		arcLength: Math.PI*6/4,
		counterClockwise: false,

		x: canvas.width/2,
		y: canvas.height/2,

		running: true
	};
	
	for( var key in defaultOptions ) {
		if( typeof options[key] == "undefined") options[key] = defaultOptions[key];
		this[key] = options[key];
	}


	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");
	this.startTime = Date.now();

	this.render();
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
	
	var text = Math.round( this.currentValue*100 ) + this.text.identifier;
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