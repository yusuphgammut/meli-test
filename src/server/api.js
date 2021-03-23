import express from 'express';

import {fetchQuery} from '../../lib/utils/fetchQuery.js';
import {fetchId} from '../../lib/utils/fetchId.js';

const apiRouter = express.Router();

const meliApiUrl = 'https://api.mercadolibre.com';
const errorCallback = (e, res) => {
	console.log(e);
	res.send('There was an error in the data fetch');
};

apiRouter.get('/items', (req, res) => {
	const query = req.query.q;
	fetchQuery(query, meliApiUrl)
		.then((data) => res.send(data))
		.catch((e) => {
			errorCallback(e, res);
		});
});

apiRouter.get('/items/:id', (req, res) => {
	const {id} = req.params;
	fetchId(id, meliApiUrl)
		.then((data) => res.send(data))
		.catch((e) => {
			errorCallback(e, res);
		});
});

export default apiRouter;
