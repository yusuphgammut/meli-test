import * as React from 'react';
import {Route, Switch} from 'react-router-dom';

import NavBar from '../components/NavBar/NavBar.jsx';
import NoMatch from './NoMatch.jsx';
import routes from './routes.js';
import './globalStyles/global.scss';

/* eslint-disable react/jsx-props-no-spreading */
/**
 * Entry function for the application.
 *
 * @returns {object} The application component.
 */
export default function App() {
	return (
		<div className="container">
			<NavBar />

			<Switch>
				{routes.map(({path, exact, fetchData, component: C}) => (
					<Route
						key={path}
						path={path}
						exact={exact}
						render={(props) => (
							<C fetchData={fetchData} {...props} />
						)}
					/>
				))}
				<Route path="*">
					<NoMatch />
				</Route>
			</Switch>
		</div>
	);
}
