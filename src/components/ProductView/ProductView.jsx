import * as React from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';

import './productView.scss';

/**
 * Component for the product detail view.
 *
 * @param {object} props - Component props.
 * @param {Function} props.fetchData - Function to fetch data from the API.
 * @param {object} props.staticContext - Data provided by the StaticRouter during SSR.
 * @returns {object} ProductView component.
 */
export default function ProductView({fetchData, staticContext}) {
	const {id: productId} = useParams();

	const [data, setData] = React.useState(() => (__isBrowser__ // eslint-disable-line no-undef
		? window.__INITIAL_DATA__ // Hydration.
		: staticContext.data // Server side rendering.
	));
	const [loading, setLoading] = React.useState(!data);
	const shouldFetchNewData = React.useRef(!data);

	React.useEffect(() => {
		if (shouldFetchNewData.current === true) {
			setLoading(true);
			fetchData(productId)
				.then((productData) => {
					setData(productData);
					setLoading(false);
				});
		} else {
			shouldFetchNewData.current = true;
			window.__INITIAL_DATA__ = false;
		}
	}, [productId, fetchData, shouldFetchNewData]);

	return (loading
		? <div>loading...</div>
		: (
			<div className="productview__container">
				<div className="productview__wrapper ut-grid-container">
					<div className="productview__breadcrumb">
						{data.item.breadcrumb.join(' > ')}
					</div>
					<div className="productview__product">
						<div className="productview__hero">
							<img
								className="productview__img"
								src={data.item.picture}
								alt=""
							/>
							<div className="productview__description">
								<h3 className="productview__desc-title">Descripción del producto</h3>
								<p className="productview__desc-p">{data.item.description}</p>
							</div>
						</div>
						<div className="productview__info">
							<p className="productview__qty">
								{`${data.item.condition} - ${data.item.sold_quantity} vendidos`}
							</p>
							<h1 className="productview__title">{data.item.title}</h1>
							<h2 className="productview__price">{`$ ${data.item.price.amount}`}</h2>
							<button type="button" className="productview__btn">Comprar</button>
						</div>
					</div>
				</div>
			</div>
		)
	);
}

/* eslint-disable react/forbid-prop-types */
ProductView.propTypes = {
	fetchData: PropTypes.func,
	staticContext: PropTypes.object,
};

ProductView.defaultProps = {
	fetchData: () => Promise.resolve(),
	staticContext: {},
};
