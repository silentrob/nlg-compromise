
var Grammar = function(g, system) {
	this.nodes = [];
	this.system = system;
	this.stack = [];
	for (var i = 0; i < g.length; i++) {
		this.nodes.push(new Category(g[i]));
	}
}

Grammar.prototype.findByName = function(name) {
	for (var i = 0; i < this.nodes.length; i++) {
		if (this.nodes[i].name === name) {
			return this.nodes[i];
		}
	}
}

Grammar.prototype.generate = function() {
	if (!this.root) {
		this.unify();
	}

	var tok = [];
	// Here we look for a lex or pattern	
	var runstep = function(data) {
		var steps = data.pattern;
		
		for (var i = 0; i < steps.length; i++) {
			var p = steps[i];
			if (data[p].lex) {
				tok.push(data[p].lex);
			} 

			if (data[p].pattern) {
				runstep(data[p]);
			}
		}
	}

	runstep(this.root[0]);
	return tok.join(" ");
}

Grammar.prototype.unify = function() {
	// Main entry point to unification process
	if (this.findByName("s")) {
		var root = this.findByName("s");
		if (root.data.length === 1) {
			this.root = root.data;
			this._process(root.data);
			return this.root;
		} else {
			console.log("Not sure how to process Root ALT");
			return false;
		}
	} else {
		console.log("No root Node found");
		return false;
	}
}

Grammar.prototype._process = function(data) {

	if (data[0].pattern) {
		for (var i = 0; i < data[0].pattern.length; i++) {
			var item = data[0].pattern[i];

			// for number
			this.stack.push(item);

			if (data[0][item].cat) {
				var category = data[0][item].cat;

				if (this.findByName(category)) {
					var new_data = this.findByName(category).data;
					if (new_data.length === 1) {
						new_data = JSON.parse(JSON.stringify(new_data[0]));
					} else {
						// For multiple alternates (check tense)
						for (var n = 0; n < new_data.length; n++) {
							if (new_data[n].tense && this.system.features.tense) {
								if (new_data[n].tense === this.system.features.tense) {
									new_data = new_data[n];
								}
							}
						}
					}
					
					for (var attrname in new_data) { 
						data[0][item][attrname] = new_data[attrname]; 
					}

					this._process([new_data]);

				} else {
					if (data[0][item].number) {
						var offset = data[0][item].number;
						var len = this.stack.length + offset - 1;
						var fun = this.stack[len];
						data[0][item].lex = this.system[fun].lex;
					}
				}
			}
		}
	} else {
		console.log(data[0], "does not have a pattern to follow");
	}
}

var Category = function(data) {
	this.name = data.cat;
	this.data = data.alt;	
}

module.exports = Grammar;
