/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */


var Guage = function(canvas, options) {
	options = options || {};

	var defaultOptions = {
		color: "lightblue",
		bgColor: "#eee",
		clockwise: false,
		value: Math.PI*1.2,
		rotation: 0,
		radius: 50,
		duration: 5000
	};

	for( var key in defaultOptions ) {
		if( typeof options[key] == "undefined") options[key] = defaultOptions[key];
		this[key] = options[key];
	}



    this.radians = 0;
    this.destinationRadians = options.value;

    this.ctx = canvas.getContext("2d");
    this.iterationCount = 0;

    this.startTime = Date.now();

    this.render();
};


Guage.prototype.drawArc = function(startDegree, endDegree) {
	var ctx = this.ctx;
	var canvas = ctx.canvas;

	startDegree += -Math.PI/2 + this.rotation;
	endDegree += -Math.PI/2 + this.rotation;

	ctx.beginPath();
	ctx.arc(canvas.width/2, canvas.height/2, this.radius, startDegree, endDegree, this.clockwise);
	ctx.stroke();

};

Guage.prototype.ease = function(currentIteration, startValue, changeInValue, totalIterations) {
	return -changeInValue * (Math.pow(currentIteration / totalIterations - 1, 4) - 1) + startValue;
};

Guage.prototype.render = function() {
	var ctx = this.ctx;
	var currentIteration = Date.now() - this.startTime;

    // Update guage position
	this.radians = this.ease( currentIteration, 0, this.destinationRadians, this.duration);

	// Clear the canvas
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	ctx.lineWidth = 20;

	// Draw background
	ctx.strokeStyle = this.bgColor;
	this.drawArc(0, Math.PI*2);

	// Draw guage
    ctx.strokeStyle = this.color;
    this.drawArc(0, this.radians);

    // Schedule next call if we aren't done yet
	if( currentIteration < this.duration )
		window.requestAnimationFrame( this.render.bind(this) );
};



(function() {
	var canvas = document.createElement("canvas");
	document.body.appendChild(canvas);

	guage = new Guage(canvas);
})();