var Guage = function(canvas, options) {
	options = options || {};

	var defaultOptions = {
		color: "lightblue",
		bgColor: "#eee",
		lineWidth: 20,

		currentValue: 0,
		value: 1,
		
		easing: "easeOutQuint",
		duration: 5000,
		
		rotation: 0,
		clockwise: false,
		startPosition: (Math.PI/4)*3,
		endPosition: Math.PI/4,

		x: canvas.width/2,
		y: canvas.height/2
	};

	for( var key in defaultOptions ) {
		if( typeof options[key] == "undefined") options[key] = defaultOptions[key];
		this[key] = options[key];
	}

	if( options.radius ) {
		this.radius = options.radius;
	} else {
		this.radius = (canvas.width < canvas.height) ? canvas.width/2 : canvas.height/2;
		this.radius -= this.lineWidth/2;
	}

	if( options.font ) {
		this.font = options.font;
	} else {
		this.font = (canvas.height/5) + "px Arial";
	}


    this.ctx = canvas.getContext("2d");
    this.iterationCount = 0;

    this.startTime = Date.now();

    this.render();
};


Guage.prototype.drawArc = function(startDegree, endDegree) {
	var ctx = this.ctx;
	var canvas = ctx.canvas;

	ctx.save();
	ctx.translate( this.x, this.y );
	//ctx.rotate( this.rotation );

	ctx.beginPath();
	console.log(this.radius);
	ctx.arc(0, 0, this.radius, startDegree, endDegree, this.clockwise);
	ctx.stroke();

	ctx.restore();

};

// https://gist.github.com/gre/1650294 - Thanks gre!
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
	var currentIteration = Date.now() - this.startTime;

    // Update guage position
	this.currentValue = this.ease[this.easing]( currentIteration/this.duration )*this.value;

	// Clear the canvas
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	ctx.lineWidth = this.lineWidth;

	// Draw background
	ctx.strokeStyle = this.bgColor;
	this.drawArc(0, Math.PI*2);

	// Draw guage
    ctx.strokeStyle = this.color;
    this.drawArc(this.startPosition, this.endPosition);

    // Draw text
    ctx.fillStyle = this.color;
    ctx.font = this.font;
    text = Math.round( this.currentValue*100 ) + "%";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, ctx.canvas.width/2, ctx.canvas.height/2);

    // Schedule next call if we aren't done yet
	if( currentIteration < this.duration )
		window.requestAnimationFrame( this.render.bind(this) );
};
