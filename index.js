
var grammar_data = require("./grammar");
var Systemic = require("./systemic");
var Grammar = require("./unify");

var gen = {
	process: "save",
	actor: "system",
	goal: "document",
	speechact: "assertion",
	tense: "future"
};

var systemic = new Systemic(gen);
var grammar = new Grammar(grammar_data, systemic);
var x = grammar.unify();
console.log(JSON.stringify(x, null, 2));
var s = grammar.generate();
console.log(s);



