var Lexicon = require("./lexicon");
var util = require("./util");

var Systemic = function(input) {
	// Mood, Transitivity, Theme
	// field, tenor, mode (basis)

	this.features = input;
	this.clause()
}

Systemic.prototype.clause = function() {

	var sub_systems = ["mood", "transitivity", "theme"];
	this.order = ["predicator"];
	this.predicator = new Lexicon(this.features.process, "verb");

	for (var i = 0; i < sub_systems.length; i++) {
		var fun = sub_systems[i];
		this[fun].call(this);
	}
}

// Mood System
// Subject, Finite (aux), Predicator (verb), Object
// Inter-personal Meta Function
// ie: Commanding, Asking, Telling.
Systemic.prototype.mood = function() {
	
	var INDICATIVE = 0;
	var IMPERATIVE = 1;
	var SUBJECTIVE = 2;

	// TODO - We need some way to drive the mood.
	var mood = util.randomInt(2);
	mood = 0;

	switch(mood) {
		case INDICATIVE:
			// indicative type (statement or question)
			
			util.insertBeforeKey(this.order, "predicator", "finite");
			this.order.unshift("subject");

			// Subject is Noun Phrase
			this.subject = new Lexicon();

			// Finite: auxiliary
			this.finite = new Lexicon(null, "AUX");

			// Indicative Type 
			// Declatitive or Interrogative
			if (this.features.speechact === "assertion") {
				//Declatitive

			} else {
				util.insertBeforeKey(this.order, "finite", "subject");

				// Interrogative Type
				// YN or WH
				if (randomInt(1) === 0) {
					this.order.unshift("wh");
					this.wh = function() { return "WH"; }
				} else {
					this.yn = function() { return "YN"; }
				}				
			}

			break;
		case IMPERATIVE:
			// imperative type (command or request)
				predicator: infi
			break;
		case SUBJECTIVE:
			// subjective type (wish or doubt)

			break;
	}
}

// Transitivity System
// Actor (doer), Process, Goal - The object being acted upon
// Ideational Meta Function
// Nature of the roles being expressed and Varierty of case roles the must be expressed
// Here we determine One of (Material Process, Mental Process, Verbal Process, Relational Process)
Systemic.prototype.transitivity = function() {
	var self = this;
	var transitivity_type;

	var material_verbs = ["kick", "run", "repair", "save", "burn", "send", "bought"];
	var relational_verbs = ["is", "has", "be", "have", "become"];
	var mental_verbs = ["like", "see", "saw", "knew", "hoped", "please", "realize"];
	var verbal_verbs = ["said", "say", "tell", "warn", "ask", "argue"];

	var verb_groups = [material_verbs, relational_verbs, mental_verbs, verbal_verbs];
	var verb_groups_functions = ['material', 'relational', 'mental', 'verbal'];

	// Material is "Doing"
	// Mental is "Expirenceing or Sencing"

	// Simple lookup on process to find transitive-type
	for (var vg = 0; vg < verb_groups.length; vg++) {
		for (var verb = 0; verb < verb_groups[vg].length; verb++) {
			if (verb_groups[vg][verb].indexOf(this.features.process) !== -1) {
				transitivity_type = verb_groups_functions[vg];
				break;
			}
		}
	}

	switch (transitivity_type) {
		case "material": 
		this.goal = new Lexicon(this.features.goal, "NP");

		this.process = [self.finite, self.predicator];		
		this.voice();

		break;
		// TODO the other types
	}
}

// Active or Passive Voice
Systemic.prototype.voice = function() {

	// if (util.randomInt(1) === 0) {
	if (true) {
		// Active voice
		this.actor = this.subject;
		this.actor.set(this.features.actor, "NP");
		this.object = this.goal;
		util.insertAfterKey(this.order, "predicator", "object");		
	} else {
		// passive voice
		this.goal = this.subject;
		this.finite = "be";
	}
}

// Theme System
// Theme, Rheme
// Textual Meta Functon
// Deals with themeization and reference and how it fits into the current discourse.
Systemic.prototype.theme = function() {
	if (true /*util.randomInt(1) === 0*/) {
		// Unmarked Theme
		this.theme = this.subject;
		this.rheme = [this.predicator, this.object];
	} else {
		// Marked Theme
		// TODO!
	}

	// console.log(this);
}

module.exports = Systemic;