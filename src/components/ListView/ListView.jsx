import * as React from 'react';
import PropTypes from 'prop-types';
import {Link, useLocation} from 'react-router-dom';
import queryString from 'query-string';

import './listView.scss';

/**
 * Component for the product list view.
 *
 * @param {object} props - Component props.
 * @param {Function} props.fetchData - Function to fetch data from the API.
 * @param {object} props.staticContext - Data provided by the StaticRouter during SSR.
 * @returns {object} ListView component.
 */
export default function Grid({fetchData, staticContext}) {
	// React Router puts all query strings under "location.search".
	const {search} = useLocation();
	// From all query strings we need only "?search=".
	const {search: searchQuery} = queryString.parse(search);

	const [data, setData] = React.useState(() => (__isBrowser__ // eslint-disable-line no-undef
		? window.__INITIAL_DATA__ // Hydration.
		: staticContext.data // Server side rendering.
	));
	const [loading, setLoading] = React.useState(!data);
	const shouldFetchNewData = React.useRef(!data);

	React.useEffect(() => {
		if (shouldFetchNewData.current === true) {
			setLoading(true);
			fetchData(searchQuery)
				.then((newRepos) => {
					setData(newRepos);
					setLoading(false);
				});
		} else {
			shouldFetchNewData.current = true;
			window.__INITIAL_DATA__ = false;
		}
	}, [searchQuery, fetchData, shouldFetchNewData]);

	return (loading
		? <div>loading...</div>
		: (
			<div className="listview__container">
				<div className="listview__wrapper ut-grid-container">
					<div className="listview__breadcrumb">
						{data.breadcrumb.join(' > ')}
					</div>
					<ul className="listview__list">
						{data.items.map(({
							id,
							title,
							price,
							picture,
							condition,
							free_shipping: freeShipping,
						}) => (
							<li key={id} className="listview__item">
								<Link to={`/items/${id}`}>
									<img src={picture} alt="" className="listview__img" />
									<div className="listview__info">
										<h3 className="listview__price">
											{`$ ${price.amount}`}
											{freeShipping && (
												<span className="listview__shipping">
													<img
														srcSet="/assets/icon-shipping.png, /assets/icon-shipping-2x.png 2x"
														src="/assets/icon-shipping.png"
														alt="Envío gratis"
													/>
												</span>
											)}
										</h3>
										<h2 className="listview__title">{title}</h2>
										<p className="listview__condition">{condition}</p>
									</div>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		)
	);
}

/* eslint-disable react/forbid-prop-types */
Grid.propTypes = {
	fetchData: PropTypes.func,
	staticContext: PropTypes.object,
};

Grid.defaultProps = {
	fetchData: () => Promise.resolve(),
	staticContext: {},
};
