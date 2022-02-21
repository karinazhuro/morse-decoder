const MORSE_TABLE = {
	'.-': 'a',
	'-...': 'b',
	'-.-.': 'c',
	'-..': 'd',
	'.': 'e',
	'..-.': 'f',
	'--.': 'g',
	'....': 'h',
	'..': 'i',
	'.---': 'j',
	'-.-': 'k',
	'.-..': 'l',
	'--': 'm',
	'-.': 'n',
	'---': 'o',
	'.--.': 'p',
	'--.-': 'q',
	'.-.': 'r',
	'...': 's',
	'-': 't',
	'..-': 'u',
	'...-': 'v',
	'.--': 'w',
	'-..-': 'x',
	'-.--': 'y',
	'--..': 'z',
	'.----': '1',
	'..---': '2',
	'...--': '3',
	'....-': '4',
	'.....': '5',
	'-....': '6',
	'--...': '7',
	'---..': '8',
	'----.': '9',
	'-----': '0',
};

function decode(expr) {
	// 0010101010|0000000010|**********|0010111010|0010111010|0000111111 ->
	// ....       .          \s         .-..       .-..       ---
	function decodeToMose(input) {
		const chunk = [];

		for (let i = 0; i < input.length; i += 10) {
			chunk.push(input.substring(i, i + 10));
		}

		return chunk.map(decodeChunk);
	}

	// chunk is sequence form 10 chars
	// '**********' -> ' '
	// '0000000010' -> '.'
	// '0000000011' -> '-'
	// '1010101010' -> '.....'
	// '0010111010' -> '.-..'
	function decodeChunk(chunk) {
		if (chunk.startsWith('*')) return ' ';

		let result = '';

		for (let i = 0; i < chunk.length; i += 2) {
			result += decodeByte([chunk[i], chunk[i + 1]].join(''));
		}

		return result;
	}

	// byte
	// '00' -> ''
	// '10' -> '.'
	// '11' -> '-'
	function decodeByte(byte) {
		return byte === '10' ? '.' : byte === '11' ? '-' : '';
	}

	// ....       .          \s         .-..       .-..       ---
	// h          e          \s         l          l          o
	function decodeToChar(morse) {
		return morse.map(item => MORSE_TABLE[item] || ' ').join('');
	}

	return decodeToChar(decodeToMose(expr));
}

module.exports = {
	decode
}