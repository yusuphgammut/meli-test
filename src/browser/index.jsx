import * as React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import App from '../shared/App.jsx';

ReactDOM.hydrate(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('app'),
);
