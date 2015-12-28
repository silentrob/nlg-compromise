
var Lexicon = function(lex, cat) {
	this.lex = lex || null;
	this.cat = cat || "";
}

Lexicon.prototype.set = function(lex, cat) {
	this.lex = lex;
	this.cat = cat;
}

module.exports = Lexicon;