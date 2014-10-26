# Just the Gauge
Just the Gauge is a [microjs](http://microjs.com/#) library for creating simple gauges with the Canvas element.

## Getting Started
It's easy, trust me.

### 1. Include Gauge.js in your page
That's easy enough, right?
``` html
<script src="Gauge.js"></script>
```

### 2. Create a new object from the Gauge prototype.
A little javascript here, a little javascript there...
``` javascript
var gauge = new Gauge(canvas);
```
The canvas argument can be either a string representing the ID of a canvas element on the page, the canvas element itself, or the context of the canvas element. Pick one, they all work.

### 3. That's it! You're done! (Sort of...)
Of course you can just leave the options argument empty. The defaults look nice! But you probably want to tell the gauge what value it should show.

``` javascript
var gauge = new Gauge(canvas, {
	from: 0,
	to: 0.7
});
```

`from` and `to` are both normalized values from 0 to 1. In this case, our gauge will start at `0%` and animate to `70%`.

There are allot of options available, just take a look!

## Methods
Gauge only has three methods: `freeze`, `thaw`, and `setValue`. `Freeze` stops the animation, `thaw` starts it again, and `setValue` lets you, as you might expect, set the value. It accepts a single argument - a normalized value between 0 and 1. See the `to` option below.

``` javascript
myGauge.freeze();
myGauge.thaw();

myGauge.setValue(0.25);
```

Also, `stop` and `start` are aliases to `freeze` and `thaw` respectively. Just in case you don't like those names. (But who wouldn't?)

## Options
Every option (*every* option) has a default value. You can leave the entire object out if you like... But then all your gauges would go from 0% to 100%. That wouldn't be very fun. Here's the default options object to get you started. More detailed information is below.

```javascript
Gauge.prototype.defaultOptions = {
	color: "lightblue",
	bgColor: "#eee",
	lineWidth: 20,

	textX: canvas.width/2,
	textY: canvas.height/2,
	textFont: (canvas.height/5) + "px Arial",
	textAlign: "center",
	textBaseline: "middle",
	textTransform: function(value) { return Math.round(value*100) + "%"; }

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
```



### color
Default: `lightblue`

The color of your gauge. Accepts any canvas strokeStyle.


### bgColor
Default: `#eee`

The background color of your gauge. Accepts any canvas strokeStyle


### lineWidth
Default: `20`

The thickness of your gauge. Accepts any number greater than zero.

### textTransform
Default: `??%`

A function that takes the current normalized value of the gauge, and returns a string to be placed in the center of the canvas representing the current value.

### textFont
Default: `??px Arial`

The default font is calculated based on the height of your canvas. It accepts any standard font property. (Think CSS `font-family` values)

### textAlign
Default: `center`

The alignment (right/left/center/justify) of the indicator text. See [textAlign](http://www.w3schools.com/tags/canvas_textalign.asp).

### textBaseline
Default: `middle`

The baseline of the indicator text. See [textBaseline](http://www.w3schools.com/tags/canvas_textbaseline.asp)

### textIdentifier
Default: `%`

The identifier (as a string) to be used at the end of the indicator text.

### textX
Default: `canvas.width/2`

The x position of the text identifier.

### textY
default: `canvas.height/2`

The y position of the text identifier.

### easing
Default: `easeOutSine`

Defines the easing function to use. Every easing function in the following list (except linear) requires one of the following prefixes: `In`, `Out`, `InOut`. For example, if you wanted to ease in with a sine function, you would write `easeInSine`, and if you wanted to use a cubic ease both in and out you would write `easeInOutCubic`.

Available easing functions:
- Linear
- Quad
- Cubic
- Quart
- Quint
- Sine
- Expo
- Circ

Additionally, you can define your own easing function by adding it to the Gauge.prototype.ease object. It should take the form of a standard Penner easing function. (Google it if you're not sure, and take a look at the source code.)


### duration
Default: `5000`

How long, in milliseconds, the transition from one value to the next should take.


### from
Default: `0`

The value that the gauge should start at, defined as a normalized range between 0 and 1. For example, if I want the gauge to start at 50%, I would write `0.5`, or 4% `0.04`.


### to
Default: `1`

The value you want the gauge to animate to. Takes the same form as the `from` option.


### radius
Default: `??px`

The radius of the gauge. The default radius is as largest as the narrowest side of the canvas. (It takes up as much space as possible.)


### arcStart
Default: `3π/4`

Where the gauge should start, as a radian. You may want to look up how radians are handled in canvas, as it's a bit backward.


### arcLength
Default: `6π/4`

How long the gauge should be, drawn from `arcStart`. Takes the same form as `arcStart`


### counterClockwise
Default: `false`

Whether or not you want the gauge to be drawn counterClockwise. I'm not sure why this would be useful, but if you find it to be all the better.


### x
Default: `canvas.width/2`

The x location (in pixels) of the center of the gauge. Defaults to the middle of the canvas.

### y
Default: `canvas.height/2`

The y location (in pixels) of the center of the gauge. Default to the middle of the canvas.


### running
Default: `true`

Whether the gauge is currently animating. Set this to false if you will start it later with `gauge.thaw`.


## License
The MIT License (MIT)

Copyright (c) 2014 Jayshua Nelson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.