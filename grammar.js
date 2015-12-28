// Simple unification

module.exports = [
	{
		cat: "s",
		alt: [{
			actor: {cat: "np"},
			process: {
				cat: "vp",
				number: -2
			}, 
			goal: {cat: "np"},
			pattern: ["actor", "process", "goal"]
		}]
	},
	{
		cat: "np",
		alt: [{
			head: {
				cat: "noun",
				number: -2
			},
			delimiter: {
				cat: "article",
				lex: "the"
			},
			pattern: ["delimiter", "head"],
		}]
	},
	{
		cat: "vp",
		alt: [{
			tense: "present",
			head: "",
			pattern: ["head"]
		},{
			tense: "future",
			auxiliary: {
				cat: "modal",
				lex: "will"
			},
			head: {
				cat: "verb",
				ending:"root"
			},
			pattern: ["auxiliary", "head"]
		}]
	}
];
