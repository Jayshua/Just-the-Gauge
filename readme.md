# Just the Guage
Just the Guage is a [micro](http://microjs.com/#) library for creating simple guages with the Canvas element.

## Getting Started
It's easy, trust me.

### 1. Include Guage.js in your page
That's easy enough, right?
``` html
<script src="Guage.js"></script>
```

### 2. Create a new object from the Guage prototype.
A little javascript here, a little javascript there...
``` javascript
var guage = new Guage(canvas);
```

### 3. That's it! You're done! (Sort of...)
Of course you can just leave the options argument empty. The defaults look nice! But you probably want to tell the guage what value it should show.

``` javascript
	var guage = new Guage(canvas, {
		from: 0,
		to: 0.7
	});
```

`from` and `to` are both normalized values from 0 to 1. In this case, our guage will start at `0%` and animate to `70%`.

There are alot of options avalible, just take a look!

## Methods
Guage only has three methods: `freeze`, `thaw`, and `setValue`. `Freeze` stops the animation, `thaw` starts it again, and `setValue` lets you, as you might expect, set the value. It accepts a single argument - a normalized value between 0 and 1. See the `to` option below.

Also, `freeze` and `thaw` are aliased to `stop` and `start` respectivly. Just in case you don't like those names. (But who wouldn't?)

## Options
Every option (*every* option) has a default value. You can leave the entire object out if you like... But then all your guages would go from 0% to 100%. That wouldn't be very fun. Here's the default options object to get you started. More detailed information is below.

```javascript
var defaultOptions = {
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
```



### color
Default: `lightblue`

The color of your guage. Accepts any canvas strokeStyle.


### bgColor
Default: `#eee`

The background color of your guage. Accepts any canvas strokeStyle


### lineWidth
Default: `20`

The thickness of your guage. Accepts any number greater than zero.

---

### text
Default: `N/A`

The `text` option is an object that takes the following attributes

#### font
Default: `??px Arial`

The default font is calculated based on the height of your canvas. It accepts any standard font property. (Think CSS `font-family` values)

#### align
Default: `center`

The alignment (right/left/center/justify) of the indicator text. See [textAlign](http://www.w3schools.com/tags/canvas_textalign.asp).

#### baseline
Default: `middle`

The baseline of the indicator text. See [textBaseline](http://www.w3schools.com/tags/canvas_textbaseline.asp)

#### identifier
Default: `%`

The identifier (as a string) to be used at the end of the indicator text.

#### x
Default: `canvas.width/2`

The x position of the text identifier.

#### y
default: `canvas.height/2`

The y position of the text identifier.

---

### easing
Default: `easeOutSine`

Defines the easing function to use. Every easing function in the following list (except linear) requires one of the following prefixs: `In`, `Out`, `InOut`. For example, if you wanted to ease in with a sine function, you would write `easeInSine`, and if you wanted to use a cubic ease both in and out you would write `easeInOutCubic`.

Avalible easing functions:
- Linear
- Quad
- Cubic
- Quart
- Quint
- Sine
- Expo
- Circ

Additionally, you can define your own easing function by adding it to the Guage.prototype.ease object. It should take the form of a standard Penner easing function. (Google it if you're not sure, and take a look at the source code.)


### duration
Defualt: `5000`

How long, in milliseconds, the transition from one value to the next should take.


### from
Default: `0`

The value that the gauge should start at, defined as a normalized range between 0 and 1. For example, if I want the guage to start at 50%, I would write `0.5`, or 4% `0.04`.


### to
Default: `1`

The value you want the guage to animate to. Takes the same form as the `from` option.


### radius
Default: `??px`

The radius of the guage. The default radius is as largest as the narrowest side of the canvas. (It takes up as much space as possible.)


### arcStart
Default: `3π/4`

Where the guage should start, as a radian. You may want to look up how radians are handled in canvas, as it's a bit backward.


### arcLength
Default: `6π/4`

How long the guage should be, drawn from `arcStart`. Takes the same form as `arcStart`


### counterClockwise
Default: `false`

Whether or not you want the guage to be drawn counterClockwise. I'm not sure why this would be usefull, but if you find it to be all the better.


### x
Default: `canvas.width/2`

The x location (in pixels) of the center of the guage. Defaults to the middle of the canvas.

### y
Default: `canvas.height/2`

The y location (in pixels) of the center of the guage. Default to the middle of the canvas.


### running
Default: `true`

Whether the guage is currently animating.

