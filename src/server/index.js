import express from 'express';
import cors from 'cors';

import apiRouter from './api.js';
import ssrRouter from './ssr.jsx';

const port = 6012;
const app = express();

app.use(cors());
app.use(express.static('dist'));

app.use('/api', apiRouter);
app.use('/', ssrRouter);

app.listen(port, () => {
	console.log(`Server is listening on port: ${port}`);
});
