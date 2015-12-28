// Helpers
// Insert Or Move! before
exports.insertBeforeKey = function(array, key, element) {
	insertKey(array, key, element, 0);
}

exports.insertAfterKey = function(array, key, element) {
	insertKey(array, key, element, 1);
}

var insertKey = function(array, key, element, offset) {
	var index = array.indexOf(key);
	var remove_index = array.indexOf(element);
	if (remove_index !== -1) {
		array.splice(remove_index, 1);
	}
	if (index !== -1) {
		array.splice(index + offset, 0, element);
	}
	return array;
}

exports.randomInt = function(max) {
	var min = 0;
	return Math.floor(Math.random()*(max-min+1)+min);
}