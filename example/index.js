var Ractive = require("ractive");
var fs = require("fs");
require("../");

window.Ractive = Ractive;

console.log("Ractive components", Ractive.components);

var template = fs.readFileSync(__dirname + "/template.html", "utf8");

new Ractive({
	el: document.querySelector("main"),
	template: template
}).on("changedPage", function(data){
	console.log(data);
});
