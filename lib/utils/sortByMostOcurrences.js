/**
 * Sort an array of objects with products with the larger number of ocurrences
 * of the provided product's key first.
 *
 * @param {Array} arr - Array to be sorted.
 * @param {number|string} sortKey - Property of the object to look for ocurrences.
 * @returns {Array} Sorted array by most number of occurrences.
 */
function sortByMostOcurrences(arr, sortKey) {
	// Create an object with the provided product' sortKey as keys and an array
	// of all products from that category as values.
	const ocurrencesMap = arr.reduce((acc, current) => {
		const key = current[sortKey];

		if (!acc[key]) acc[key] = [];
		acc[key].push(current);

		return acc;
	}, {});

	// Convert the object to an array, sort it by length of the array
	// and flatten it.
	const sortedArray = Object.values(ocurrencesMap)
		.sort((a, b) => b.length - a.length)
		.flat();

	return sortedArray;
}

export {sortByMostOcurrences};
