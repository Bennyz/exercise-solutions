var justifyLine = function(line, requiredSpaces) {

	if (line.length == 1) {
		return line;
	}

	var words = line.slice(0, line.length - 1);
	var numberOfSpacePositions = words.length;
	var spacePerPosition = Math.floor(requiredSpaces / numberOfSpacePositions);
	var remainingSpaces = requiredSpaces % numberOfSpacePositions;

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
	
	words.forEach(function(word, index) {
		if (currLineLength + word.length + 1 < len) {
			currLineLength += word.length + 1;
			currLine.push(word);
		} else {
			var requiredSpaces = len - (currLineLength - currLine.length - 1);
			lines.push(justifyLine(currLine, requiredSpaces));
			currLine = [];
			currLine.push(word);
			currLineLength = word.length - 1;
		}
	});

	lines.push(currLine.join(' '));
	return lines.join('\n');
};
//var str = 'Benny wne go for away die new baby new majit';
var str = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sagittis dolor mauris, at elementum ligula tempor eget. In quis rhoncus nunc, at aliquet orci. Fusce at dolor sit amet felis suscipit tristique. Nam a imperdiet tellus. Nulla eu vestibulum urna. Vivamus tincidunt suscipit enim, nec ultrices nisi volutpat ac. Maecenas sit amet lacinia arcu, non dictum justo. Donec sed quam vel risus faucibus euismod. Suspendisse rhoncus rhoncus felis at fermentum. Donec lorem magna, ultricies a nunc sit amet, blandit fringilla nunc. In vestibulum velit ac felis rhoncus pellentesque. Mauris at tellus enim. Aliquam eleifend tempus dapibus. Pellentesque commodo, nisi sit amet hendrerit fringilla, ante odio porta lacus, ut elementum justo nulla et dolor.';

console.log(justify(str, 30));