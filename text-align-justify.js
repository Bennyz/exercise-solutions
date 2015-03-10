var addSpaces = function(line, requiredSpaces) {

	if (line.length == 1) {
		return line;
	}

	var words = line.slice(0, line.length -1);
	var wordsObject = [];
	words.forEach(function(word) {
		wordsObject.push({spaces: []});
	});
	
	while (requiredSpaces > 0) {
		var lineLength = line.length - 1;
	
		for (var i = 0; i < words.length && requiredSpaces > 0; i++) {
			//line.splice(line.indexOf(words[i]) + 1, 0, ' ');	
			wordsObject[i].spaces.push(' ');
			requiredSpaces--;
		}
	}

	var spaces = 0;
	wordsObject.forEach(function(o, index) {
		for (var i = 0; i < o.spaces.length; i++) {
			words.splice(index + 1 + spaces + i, 0, ' ');
		}

		spaces += o.spaces.length;
	});

	if (line.length > 1) {
		return words.concat(line[line.length - 1]);
	} 

	return words;
}

var justify = function(str, len) {
	var words = str.split(' ');
	var lines = [];

	var numberOfWords = words.length;
	for (var i = 0; i < numberOfWords; i++) {
		var line = [];
		var totalLineLength = 0;
		var currWordLength = 0;
		var wordCount = 0;

		for (var j = i; j < numberOfWords; j++) {
			if (words[j].length + totalLineLength < len) {
				var currWord = words[j];
				line.push(currWord);
				currWordLength += currWord.length;

				// Add space to each word
				totalLineLength += currWord.length + 1;
				wordCount++;
			} else {

				// Skip all added words
				i += wordCount - 1;
				break;
			}
		}
		if (i + 1 == numberOfWords) {
			lines.push(line.join(''));
		} else {
			line = addSpaces(line, len - currWordLength);
			lines.push(line.join(''));
		}

	}

	return lines.join('\n');
};
//var str = 'Benny wne go for away die new baby new majit';
var str = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sagittis dolor mauris, at elementum ligula tempor eget. In quis rhoncus nunc, at aliquet orci. Fusce at dolor sit amet felis suscipit tristique. Nam a imperdiet tellus. Nulla eu vestibulum urna. Vivamus tincidunt suscipit enim, nec ultrices nisi volutpat ac. Maecenas sit amet lacinia arcu, non dictum justo. Donec sed quam vel risus faucibus euismod. Suspendisse rhoncus rhoncus felis at fermentum. Donec lorem magna, ultricies a nunc sit amet, blandit fringilla nunc. In vestibulum velit ac felis rhoncus pellentesque. Mauris at tellus enim. Aliquam eleifend tempus dapibus. Pellentesque commodo, nisi sit amet hendrerit fringilla, ante odio porta lacus, ut elementum justo nulla et dolor.';

console.log(justify(str, 30));