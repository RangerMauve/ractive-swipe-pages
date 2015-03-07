var Ractive = require("ractive");

var SPPage = require("./page");
var SPContainer = require("./container");

Ractive.components.SPPage = SPPage;
Ractive.components.SPContainer = SPContainer;

module.exports = {
	SPPage: SPPage,
	SPContainer: SPContainer
};
