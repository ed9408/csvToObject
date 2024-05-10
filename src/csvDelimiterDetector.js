import fs from 'node:fs';

export class CsvDelimiterDetector {
	file = undefined;
	eol = '';
	index = -1;
	sampleLines = undefined;
	delimiter = undefined;

	constructor(fileUrl) {
		this.file = this.readFile(fileUrl);

		if (this.file instanceof Object) {
			throw new Error(
				`Ha ocurrido un error al intentar leer el archivo:\n${this.file}`
			);
		}

		this.detectEndOfLine();
		this.detectDelimiter();
	}

	detectDelimiter() {
		const delimiterArray = [',', ';', '\t'];

		if (this.index > -1) {
			const splittedText = this.file.split(this.eol);

			for (const delimiter of delimiterArray) {
				if (splittedText[0].split(delimiter).length > 1) {
					this.delimiter = delimiter;
					break;
				}
			}
		}
	}

	detectEndOfLine() {
		if (this.file.search(/\r\n/) > -1) {
			this.index = this.file.search(/\r\n/);
			this.eol = '\r\n';
		} else if (this.file.search(/\n/) > -1) {
			this.index = this.file.search(/\n/);
			this.eol = '\n';
		} else if (this.file.search(/\r/) > -1) {
			this.index = this.file.search(/\r/);
			this.eol = '\r';
		}
	}

	readFile(fileUrl) {
		let data = undefined;

		try {
			data = fs.readFileSync(fileUrl).toLocaleString();
		} catch (error) {
			data = error;
		}

		return data;
	}
}
