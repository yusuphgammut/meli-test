import fetch from 'isomorphic-fetch';

import {sortByMostOcurrences} from './sortByMostOcurrences.js';

/**
 * Fetches the given query from Mercado Libre's API and returns a promise
 * with the transformed data.
 *
 * @param {object} query - Query to fetch from the API.
 * @param {object} meliApiUrl - Mercado Libre API URL.
 * @returns {object} Promise with the transformed fetch response.
 */
export function fetchQuery(query, meliApiUrl) {
	const fetchUrl = `${meliApiUrl}/sites/MCO/search?q=${query}`;

	return fetch(encodeURI(fetchUrl))
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error, status = ${response.status}`);
			}

			return response.json();
		})
		.then((data) => {
			// Not all queries return categories with number of results, so I do it manually.
			// Sort data by most number of ocurrences first.
			const sortedData = sortByMostOcurrences(data.results, 'category_id');
			// Create an array of only unique categories.
			const sortedCategories = [...new Set(sortedData.map((item) => item.category_id))];
			// URL to fetch category data to build the breadcrumb.
			const fetchCategoryUrl = `${meliApiUrl}/categories/${sortedCategories[0]}`;

			return fetch(fetchCategoryUrl)
				.then((response) => {
					if (!response.ok) {
						throw new Error(`HTTP error, status = ${response.status}`);
					}

					return response.json();
				})
				.then((categoryData) => {
					const breadcrumb = categoryData.path_from_root.map((cat) => cat.name);

					// Select only the data that is of interest to us.
					const sortedItems = sortedData
						.map((item) => ({
							id: item.id,
							title: item.title,
							price: {
								currency: item.currency_id,
								amount: item.price,
							},
							picture: item.thumbnail,
							condition: item.condition,
							free_shipping: item.shipping.free_shipping,
						}));

					return {
						author: {
							name: 'Andrés',
							lastname: 'Rodríguez Cortés',
						},
						breadcrumb,
						categories: sortedCategories,
						items: sortedItems.slice(0, 4),
					};
				});
		});
}
