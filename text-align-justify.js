var justifyLine = function(line, requiredSpaces) {

	// No need to justify if there's just one word
	if (line.length == 1) {
		return line;
	}

	// No need to add spaces after last word, thus cutting out the last word
	var words = line.slice(0, line.length - 1);
	var numberOfSpacePositions = words.length;
	var spacePerPosition = Math.floor(requiredSpaces / numberOfSpacePositions);
	var remainingSpaces = requiredSpaces % numberOfSpacePositions;

	// Initialize spaces
	var wordsObject = [];
	words.forEach(function(word){
		wordsObject.push({spaces: []});
	});

	// Distribute first round of spaces
	wordsObject.forEach(function(o) {
		for (var i = 0; i < spacePerPosition; i++) {
			o.spaces.push(' ');
		}
	});

	// Distribute second round of spaces to avoid gaps
	if (remainingSpaces > 0) {
		for (var i = 0; i < remainingSpaces; i++) {
			wordsObject[i].spaces.push(' ');
		}
	}

	// Add spaces to create the justified line
	var justifiedLine = [];
	words.forEach(function(word, index) {
		justifiedLine.push(word);
		justifiedLine.push(wordsObject[index].spaces.join(''));
	});

	justifiedLine.push(line[words.length]);

	return justifiedLine.join('');
}

var justify = function(str, len) {
	var words = str.split(' ');
	var lines = [];

	var currLine = [];
	var currLineLength = 0;
	var totalWordLength = 0;
	words.forEach(function(word, index) {
		if (currLineLength + word.length + 1 < len) {
			totalWordLength += word.length;
			currLineLength += word.length + 1;
			currLine.push(word);
		} else {
			var requiredSpaces = len - totalWordLength;
			lines.push(justifyLine(currLine, requiredSpaces));
			currLine = [];
			currLine.push(word);
			currLineLength = word.length - 1;
			totalWordLength = word.length;
		}
	});

	lines.push(currLine.join(' '));
	return lines.join('\n');
};
