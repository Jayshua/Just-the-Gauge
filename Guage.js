var Guage = function(canvas, options) {
	options = options || {};
	var defaultOptions = {
		color: "lightblue",
		bgColor: "#eee",
		clockwise: true,
		value: Math.PI*1.5,
		rotation: -Math.PI/2,
		radius: 50,
		stepSize: Math.PI/20
	};
	for( var key in defaultOptions ) {
		if( typeof options[key] == "undefined") options[key] = defaultOptions[key];
		this[key] = options[key];
	}

    this.radians = 0;
    this.destinationRadians = options.value;

    this.ctx = canvas.getContext("2d");
};

Guage.prototype.drawArc = function(startDegree, endDegree) {
	var ctx = this.ctx;
	var canvas = ctx.canvas;

	startDegree += this.rotation;
	endDegree += this.rotation;

	ctx.beginPath();
	ctx.arc(canvas.width/2, canvas.height/2, this.radius, startDegree, endDegree, this.clockwise);
	ctx.stroke();

};

Guage.prototype.update = function() {
	if( this.radians >= this.destinationRadians - this.stepSize &&
		this.radians <= this.destinationRadians + this.stepSize ) {

		return;
	}

	var ctx = this.ctx;

	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	ctx.lineWidth = 20;

	ctx.strokeStyle = this.bgColor;
	this.drawArc(0, Math.PI*2);

    ctx.strokeStyle = this.color;
    this.drawArc(0, this.radians);

    this.radians += this.stepSize;
};



(function() {
	var canvas = document.createElement("canvas");
	document.body.appendChild(canvas);

	guage = new Guage(canvas);
	setInterval( guage.update.bind(guage), 50 );
})();