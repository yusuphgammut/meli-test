import fetch from 'isomorphic-fetch';

const internalApiUrl = 'http://localhost:6012/api/items';

/**
 * Function to fetch a query search from our own API.
 *
 * @param {object} query - Query to search for.
 * @returns {Promise} Promise with the search results.
 */
export function fetchQuery(query = '') {
	const fetchUrl = `${internalApiUrl}?q=${query}`;

	return fetch(encodeURI(fetchUrl))
		.then((response) => response.json())
		.then((data) => data)
		.catch((error) => {
			console.warn(error);
			return null;
		});
}

/**
 * Function to fetch product data from our own API.
 *
 * @param {object} productId - Product Id to search for.
 * @returns {Promise} Promise with the product data.
 */
export function fetchId(productId = '') {
	const fetchUrl = `${internalApiUrl}/${productId}`;

	return fetch(encodeURI(fetchUrl))
		.then((response) => response.json())
		.then((data) => data)
		.catch((error) => {
			console.warn(error);
			return null;
		});
}
