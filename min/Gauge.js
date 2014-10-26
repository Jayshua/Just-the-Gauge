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

Gauge.prototype.defaultOptions = {
	color: "lightblue",
	bgColor: "#eee",
	lineWidth: 20,

	textX: canvas.width/2,
	textY: canvas.height/2,
	textFont: (canvas.height/5) + "px Arial",
	textAlign: "center",
	textBaseline: "middle",
	textTransform: function(value) { return Math.round(value*100) + "%"; },

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

Gauge.prototype.render = function() {
	var ctx = this.ctx;
	var now = Date.now();
	var ellapsed = now - this.startTime;

	// Update Value
	this.currentValue = this.ease[this.easing]( ellapsed, this.from, this.to-this.from, this.duration )

	// Clear Canvas
	ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

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
	ctx.fillStyle = this.color;
	ctx.font = this.textFont;
	ctx.textAlign = this.textAlign;
	ctx.textBaseline = this.textBaseline;
	
	var text = this.textTransform(this.currentValue);
	ctx.fillText(text, this.textX, this.textY);

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

/* Ported by Kirupa */


Gauge.prototype.ease = {
	easeLinear: function(currentIteration, startValue, changeInValue, totalIterations) {
		return changeInValue * currentIteration / totalIterations + startValue;
	},
	easeInQuad: function(currentIteration, startValue, changeInValue, totalIterations) {
		return changeInValue * (currentIteration /= totalIterations) * currentIteration + startValue;
	},
	easeOutQuad: function(currentIteration, startValue, changeInValue, totalIterations) {
		return -changeInValue * (currentIteration /= totalIterations) * (currentIteration - 2) + startValue;
	},
	easeInOutQuad: function(currentIteration, startValue, changeInValue, totalIterations) {
		if ((currentIteration /= totalIterations / 2) < 1) {
			return changeInValue / 2 * currentIteration * currentIteration + startValue;
		}
		return -changeInValue / 2 * ((--currentIteration) * (currentIteration - 2) - 1) + startValue;
	},
	easeInCubic: function(currentIteration, startValue, changeInValue, totalIterations) {
		return changeInValue * Math.pow(currentIteration / totalIterations, 3) + startValue;
	},
	easeOutCubic: function(currentIteration, startValue, changeInValue, totalIterations) {
		return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 3) + 1) + startValue;
	},
	easeInOutCubic: function(currentIteration, startValue, changeInValue, totalIterations) {
		if ((currentIteration /= totalIterations / 2) < 1) {
			return changeInValue / 2 * Math.pow(currentIteration, 3) + startValue;
		}
		return changeInValue / 2 * (Math.pow(currentIteration - 2, 3) + 2) + startValue;
	},
	easeInQuart: function(currentIteration, startValue, changeInValue, totalIterations) {
		return changeInValue * Math.pow (currentIteration / totalIterations, 4) + startValue;
	},
	easeOutQuart: function(currentIteration, startValue, changeInValue, totalIterations) {
		return -changeInValue * (Math.pow(currentIteration / totalIterations - 1, 4) - 1) + startValue;
	},
	easeInOutQuart: function(currentIteration, startValue, changeInValue, totalIterations) {
		if ((currentIteration /= totalIterations / 2) < 1) {
			return changeInValue / 2 * Math.pow(currentIteration, 4) + startValue;
		}
		return -changeInValue/2 * (Math.pow(currentIteration - 2, 4) - 2) + startValue;
	},
	easeInQuint: function(currentIteration, startValue, changeInValue, totalIterations) {
		return changeInValue * Math.pow (currentIteration / totalIterations, 5) + startValue;
	},
	easeOutQuint: function(currentIteration, startValue, changeInValue, totalIterations) {
		return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 5) + 1) + startValue;
	},
	easeInOutQuint: function(currentIteration, startValue, changeInValue, totalIterations) {
		if ((currentIteration /= totalIterations / 2) < 1) {
			return changeInValue / 2 * Math.pow(currentIteration, 5) + startValue;
		}
		return changeInValue / 2 * (Math.pow(currentIteration - 2, 5) + 2) + startValue;
	},
	easeInSine: function(currentIteration, startValue, changeInValue, totalIterations) {
		return changeInValue * (1 - Math.cos(currentIteration / totalIterations * (Math.PI / 2))) + startValue;
	},
	easeOutSine: function(currentIteration, startValue, changeInValue, totalIterations) {
		return changeInValue * Math.sin(currentIteration / totalIterations * (Math.PI / 2)) + startValue;
	},
	easeInOutSine: function(currentIteration, startValue, changeInValue, totalIterations) {
		return changeInValue / 2 * (1 - Math.cos(Math.PI * currentIteration / totalIterations)) + startValue;
	},
	easeInExpo: function(currentIteration, startValue, changeInValue, totalIterations) {
		return changeInValue * Math.pow(2, 10 * (currentIteration / totalIterations - 1)) + startValue;
	},
	easeOutExpo: function(currentIteration, startValue, changeInValue, totalIterations) {
		return changeInValue * (-Math.pow(2, -10 * currentIteration / totalIterations) + 1) + startValue;
	},
	easeInOutExpo: function(currentIteration, startValue, changeInValue, totalIterations) {
		if ((currentIteration /= totalIterations / 2) < 1) {
			return changeInValue / 2 * Math.pow(2, 10 * (currentIteration - 1)) + startValue;
		}
		return changeInValue / 2 * (-Math.pow(2, -10 * --currentIteration) + 2) + startValue;
	},
	easeInCirc: function(currentIteration, startValue, changeInValue, totalIterations) {
		return changeInValue * (1 - Math.sqrt(1 - (currentIteration /= totalIterations) * currentIteration)) + startValue;
	},
	easeOutCirc: function(currentIteration, startValue, changeInValue, totalIterations) {
		return changeInValue * Math.sqrt(1 - (currentIteration = currentIteration / totalIterations - 1) * currentIteration) + startValue;
	},
	easeInOutCirc: function(currentIteration, startValue, changeInValue, totalIterations) {
		if ((currentIteration /= totalIterations / 2) < 1) {
			return changeInValue / 2 * (1 - Math.sqrt(1 - currentIteration * currentIteration)) + startValue;
		}
		return changeInValue / 2 * (Math.sqrt(1 - (currentIteration -= 2) * currentIteration) + 1) + startValue;
	}
};