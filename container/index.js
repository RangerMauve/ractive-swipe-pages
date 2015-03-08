var fs = require("fs");
var insert = require("insert-css");
var getSize = require("get-size");
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
		returning: false,
		haschanged: false
	},
	move: function (event) {
		var data = event.original;
		var delta = data.deltaX;
		this.set("returning", false);
		this.set("offset", data.deltaX);
		if (!this.get("haschanged"))
			this.checkOffset();
	},
	checkOffset: function () {
		var main_width = this.getWidth();
		var offset = this.get("offset");
		var percent = Math.abs(offset / main_width / 2 * 100);
		if (percent > 40) {
			if (offset > 0) this.prevPage();
			else this.nextPage();
		}
	},
	getWidth: function () {
		var main_container = this.find(".sp-main-container");
		var main_width = getSize(main_container).width;
		return main_width;
	},
	prevPage: function () {
		var page = this.get("page");
		var offset = this.get("offset");
		var width = this.getWidth();
		if (!page) return;

		this.set("page", page - 1);
		this.set("offset", -offset);
		this.set("haschanged", true);
	},
	nextPage: function () {
		var page = this.get("page");
		var pages = this.get("pages");
		if (page >= (pages - 1)) return;

		this.set("page", page + 1);
		this.set("offset", 0);
		this.set("haschanged", true);
	},
	stop: function (event) {
		this.set("returning", true);
		this.set("offset", 0);
		this.set("haschanged", false);
	}
});
