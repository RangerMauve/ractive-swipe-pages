var fs = require("fs");
var insert = require("insert-css");
var Ractive = require("ractive");
var getSize = require("bounding-client-rect");
require('ractive-touch');

var template = fs.readFileSync(__dirname + "/template.html", "utf8");
var style = fs.readFileSync(__dirname + "/style.css", "utf8");

insert(style);

var offset_switch = 20;

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
	move: function () {
		var event = this.event;
		var data = event.original;
		var delta = data.deltaX;
		var deltaY = data.deltaY;

		var change = this.get("haschanged");

		if (Math.abs(deltaY) > Math.abs(delta))
			delta = 0;

		if (change === "next")
			delta += this.getSize().width;
		if (change === "prev")
			delta -= this.getSize().width;

		this.set({
			returning: false,
			offset: delta,
			position: data.center.x
		});

		if (!change)
			this.checkOffset();
	},
	checkOffset: function () {
		var size = this.getSize();
		var offset = this.get("offset");

		var width = size.width;
		var left = size.left;

		var percent = Math.abs(offset / width * 100);

		if (percent > offset_switch) {
			if (offset > 0) this.prevPage();
			else this.nextPage();
		}
	},
	getSize: function () {
		var main_container = this.getContainer();
		return getSize(main_container);
	},
	getContainer: function () {
		return this.find(".sp-main-container");
	},
	prevPage: function () {
		var page = this.get("page");
		if (!page) return;

		var offset = this.get("offset");
		var width = this.getSize().width;

		var new_page = page - 1;

		this.set({
			"page": new_page,
			"offset": offset - width,
			"haschanged": "prev"
		});

		this.fire("page", {
			page: new_page,
			previous: page
		});
	},
	nextPage: function () {
		var page = this.get("page");
		var pages = this.get("pages");
		if (page >= (pages - 1)) return;

		var offset = this.get("offset");
		var width = this.getSize().width;

		var new_page = page + 1;

		this.set({
			"page": new_page,
			"offset": offset + width,
			"haschanged": "next"
		});

		this.fire("page", {
			page: new_page,
			previous: page
		});
	},
	stop: function () {
		this.set({
			"returning": true,
			"offset": 0,
			"haschanged": false
		});
	}
});
