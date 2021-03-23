import fetch from 'isomorphic-fetch';

/**
 * Fetches the given query from Mercado Libre's API and returns a promise
 * with the transformed data.
 *
 * @param {object} id - Query to fetch from the API.
 * @param {object} meliApiUrl - Mercado Libre API URL.
 * @returns {object} Promise with the transformed fetch response.
 */
export function fetchId(id, meliApiUrl) {
	const fetchIdUrl = `${meliApiUrl}/items/${id}`;
	const fetchDescUrl = `${meliApiUrl}/items/${id}/description`;

	const productInfo = fetch(encodeURI(fetchIdUrl));
	const productDesc = fetch(encodeURI(fetchDescUrl));

	return Promise.all([productInfo, productDesc])
		.then((response) => {
			const problemFound = !!response.find((element) => element.ok === false);

			if (problemFound) {
				throw new Error(`HTTP error, status = ${response.status}`);
			}

			return Promise.all(response.map((content) => content.json()));
		})
		.then((dataValues) => {
			const [info, description] = dataValues;

			// URL to fetch category data to build the breadcrumb.
			const fetchCategoryUrl = `${meliApiUrl}/categories/${info.category_id}`;

			return fetch(fetchCategoryUrl)
				.then((response) => {
					if (!response.ok) {
						throw new Error(`HTTP error, status = ${response.status}`);
					}

					return response.json();
				})
				.then((categoryData) => {
					const breadcrumb = categoryData.path_from_root.map((cat) => cat.name);

					return {
						author: {
							name: 'Andrés',
							lastname: 'Rodríguez Cortés',
						},
						item: {
							id: info.id,
							title: info.title,
							price: {
								currency: info.currency_id,
								amount: info.price,
							},
							picture: info.pictures[0]?.url,
							condition: info.condition,
							free_shipping: info.shipping.free_shipping,
							sold_quantity: info.sold_quantity,
							description: description.plain_text,
							breadcrumb,
						},
					};
				});
		});
}
