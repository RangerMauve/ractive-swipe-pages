var fs = require("fs");
var insert = require("insert-css");
var Ractive = require("ractive");

var template = fs.readFileSync(__dirname + "/template.html", "utf8");
var style = fs.readFileSync(__dirname + "/style.css", "utf8");

insert(style);

module.exports = Ractive.extend({
	isolated: true,
	template: template,
	data: {
		class: ""
	}
});
