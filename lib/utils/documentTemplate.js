import serialize from 'serialize-javascript';

/**
 * Return the HTML document template.
 *
 * @param {object} data - Inital data for the React hydration process.
 * @param {object} app - App markup.
 * @returns {string} Document HTML string.
 */
export default function getDocumentTemplate(data, app) {
	return `
		<!DOCTYPE html>
		<html>
			<head>
				<title>SSR with RRv5</title>
				<script src="/bundle.js" defer></script>
				<link href="/main.css" rel="stylesheet">
				<script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
			</head>
			<body>
				<div id="app">${app}</div>
			</body>
		</html>
	`;
}
