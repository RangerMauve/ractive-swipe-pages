var fs = require("fs");
var insert = require("insert-css");
var Ractive = require("ractive");
require('ractive-touch');

var template = fs.readFileSync(__dirname + "/template.html", "utf8");
var style = fs.readFileSync(__dirname + "/style.css", "utf8");

insert(style);

module.exports = Ractive.extend({
	isolated: true,
	template: template,
	data: {
		class: "",
		pages: 0,
		page: 0,
		offset: 0,
		returning: false
	},
	move: function (event) {
		var data = event.original;
		var delta = data.deltaX;
		this.set("returning", false);
		this.set("offset", data.deltaX);
		console.log("Setting offset to", delta, "now", this.get("offset"));
	},
	stop: function (event) {
		console.log("Stopping", event.original);
		this.set("returning", true);
		this.set("offset", 0);
	}
});
