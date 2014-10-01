var Guage = function(canvas, options) {
	var options = options || {};
	var defaultOptions = {
		color: "lightblue",
		bgColor: "#eee",
		lineWidth: 20,
		font: (canvas.height/5) + "px Arial",

		easing: "easeOutSine",
		duration: 5000,

		from: 0,
		to: 0.9,

		radius: (canvas.width < canvas.height) ? canvas.width/2.3 : canvas.height/2.3,

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
    ctx.font = this.font;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    var text = Math.round( this.currentValue*100 ) + "%";
    ctx.fillText(text, ctx.canvas.width/2, ctx.canvas.height/2);

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
Guage.prototype.stop = Guage.prototype.freeze;
Guage.prototype.start = Guage.prototype.thaw;