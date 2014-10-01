var Guage = function(canvas, options) {
	var options = options || {};
	var defaultOptions = {
		color: "lightblue",
		bgColor: "#eee",
		lineWidth: 20,
		font: (canvas.height/5) + "px Arial",

		easing: "easeOutQuart",
		duration: 10000,

		value: 1,
		currentValue: 0,

		radius: (canvas.width < canvas.height) ? canvas.width/2.3 : canvas.height/2.3,

		startPosition: Math.PI*3/4,
		arcLength: Math.PI*6/4,
		counterClockwise: false,

		x: canvas.width/2,
		y: canvas.height/2
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

Guage.prototype.ease = {
  linear: function (t) { return t },
  easeInQuad: function (t) { return t*t },
  easeOutQuad: function (t) { return t*(2-t) },
  easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
  easeInCubic: function (t) { return t*t*t },
  easeOutCubic: function (t) { return (--t)*t*t+1 },
  easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
  easeInQuart: function (t) { return t*t*t*t },
  easeOutQuart: function (t) { return 1-(--t)*t*t*t },
  easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
  easeInQuint: function (t) { return t*t*t*t*t },
  easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
  easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
};

Guage.prototype.render = function() {
	var ctx = this.ctx;
	var now = Date.now();
	var ellapsed = now - this.startTime;

	// Update Value
	this.currentValue = this.ease[this.easing]( ellapsed/this.duration )*this.value;

	// Clear Canvas
	ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

	// Draw guage background
	ctx.strokeStyle = this.bgColor;
	ctx.lineWidth = this.lineWidth;
	ctx.beginPath();
	ctx.arc(
		this.x, this.y,
		this.radius,

		this.startPosition, this.startPosition+this.arcLength,

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

		this.startPosition, this.startPosition+(this.arcLength*this.currentValue),

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

	if( ellapsed < this.duration )
		window.requestAnimationFrame( this.render.bind(this) );
};
