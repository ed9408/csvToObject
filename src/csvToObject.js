import { CsvDelimiterDetector } from './csvDelimiterDetector.js';

export class CsvToObject extends CsvDelimiterDetector {
	constructor(fileUrl) {
		super(fileUrl);

		this.#getCsvHeaders();
	}

	#cleanString(inputStr) {
		const normalizedInput = inputStr
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '');
		return normalizedInput.replaceAll(/\s/g, '_');
	}

	#getCsvHeaders() {
		const headers = this.file.split(this.eol)[0];
		const filteredHeaders = headers.split(this.delimiter).map((title) => {
			return this.#cleanString(title.trim());
		});

		return filteredHeaders;
	}

	parse() {
		let csvObject;

		const csvData = this.file
			.split(this.eol)
			.filter((line) => line.trim() !== '');
		const rows = csvData.slice(1);
		const headers = this.#getCsvHeaders();

		try {
			csvObject = rows.map((elems) => {
				const values = elems.split(this.delimiter);

				if (values.length < headers.length) {
					throw new Error(
						`Faltan elementos, valida por favor los datos de las filas.\n${elems}`
					);
				}

				return headers.reduce(
					(obj, title, idx) => (
						(obj[title] = values[idx].trim()), obj
					),
					{}
				);
			});
		} catch (error) {
			throw error;
		}

		return csvObject;
	}
}
