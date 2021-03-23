import express from 'express';
import * as React from 'react';
import ReactDOM from 'react-dom/server';
import {matchPath, StaticRouter} from 'react-router-dom';
import routes from '../shared/routes.js';

import getDocumentTemplate from '../../lib/utils/documentTemplate.js';
import App from '../shared/App.jsx';

const ssrRouter = express.Router();

// Route for the product page. Uses URL parameter "/items/:id".
ssrRouter.get('/items/:id', (req, res, next) => {
	const activeRoute = routes.find((route) => matchPath(req.path, route)) || {};
	const productId = req.path.split('/').pop();

	const promise = activeRoute.fetchData
		? activeRoute.fetchData(productId)
		: Promise.resolve();

	promise.then((data) => {
		const markup = ReactDOM.renderToString(
			<StaticRouter location={req.url} context={{data}}>
				<App />
			</StaticRouter>,
		);

		res.send(getDocumentTemplate(data, markup));
	}).catch(next);
});

// Route for the product listing page. Uses query string parameter "/items?search=".
ssrRouter.get('/items', (req, res, next) => {
	const activeRoute = routes.find((route) => matchPath(req.path, route)) || {};
	const query = req.query.search;

	const promise = activeRoute.fetchData
		? activeRoute.fetchData(query)
		: Promise.resolve();

	promise.then((data) => {
		const markup = ReactDOM.renderToString(
			<StaticRouter location={req.url} context={{data}}>
				<App />
			</StaticRouter>,
		);

		res.send(getDocumentTemplate(data, markup));
	}).catch(next);
});

// Route for the home page.
ssrRouter.get('/', (req, res) => {
	const data = {};

	const markup = ReactDOM.renderToString(
		<StaticRouter location={req.url} context={{data}}>
			<App />
		</StaticRouter>,
	);

	res.send(getDocumentTemplate(data, markup));
});

export default ssrRouter;
