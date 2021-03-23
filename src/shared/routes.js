import {fetchQuery, fetchId} from './fetchApi.js';
import Home from '../components/Home/Home.jsx';
import ListView from '../components/ListView/ListView.jsx';
import ProductView from '../components/ProductView/ProductView.jsx';

const routes = [
	{
		path: '/items/:id',
		component: ProductView,
		fetchData: (prodId = '') => fetchId(prodId),
	},
	{
		path: '/items',
		component: ListView,
		fetchData: (query = '') => fetchQuery(query),
	},
	{
		path: '/',
		exact: true,
		component: Home,
	},
];

export default routes;
