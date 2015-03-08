# ractive-swipe-pages
Ractive component for swiping between pages.
Provides a SPContainer and SPPage component for organizing things.

[Live Demo](http://rangermauve.github.io/ractive-swipe-pages/example/)

## Installing

Currently, this only supports Browserify with npm. If anyone ever needs this outside of that, please open an issue and I'll add in your preferred module system.

``` bash
npm install --save ractive-swipe-pages
```

## Example

index.js:
``` javascript
var Ractive = require("ractive");
var fs = require("fs");
require("ractive-swipe-pages");

var template = fs.readFileSync(__dirname + "/template.html", "utf8");

new Ractive({
	el: document.querySelector("main"),
	template: template
});
```

template.html:
``` html
<h1>Swipe Pages Example</h1>
<SPContainer class="main-container" pages="4" page="2">
	<SPPage class="page">
		Hello
	</SPPage>
	<SPPage class="page">
		World
	</SPPage>
	<SPPage class="page">
		This is a test of sorts
	</SPPage>
	<SPPage class="page">
		Should be pretty easy to use
	</SPPage>
</SPContainer>
```

## Usage
Just have a `SPContainer` wherever you want to have the pages contained, and have one or more `SPPage` elements as children.
Make sure to also set the `pages` attribute on `SPContainer` to set the number of pages that should be displayed.

Bowth `SPContainer` and `SPPage` take a `class` attribute to add a class to them. Try not to play with the flexbox related properties in `SPContainer`.

`SPContainer` also takes the default `page` to display.

Once it's set up, you now have pages that can be dragged between by users. It works with either touch inputs or a mouse.
