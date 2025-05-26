/**
 * converts a roman number to arabic number
 * @param {string} roman  - roman number (E.g.: IV)
 * @returns {number} - corresponding arabic number
 */
export function romanToArabic(roman: string): number | string {
	const romanMap: Record<string, number> = {
		i: 1,
		ii: 2,
		iii: 3,
		iv: 4,
		v: 5,
		vi: 6,
		vii: 7,
		viii: 8,
		ix: 9,
		x: 10,
	};
  	return romanMap[roman.toLowerCase()] || roman;
}

/**
 * converts a roman number to arabic number
 * @param {string} name  - name to be formated
 * @returns {string} - formated name
 */
export function formatGenerationName(name: string): string {
	if (!name) return '';
	
	const parts = name.split('-');
	if (parts.length === 2 && parts[0] === 'generation') {
		const arabicNumber = romanToArabic(parts[1]);
		return `Generation ${arabicNumber}`;
	}
	return name;
}