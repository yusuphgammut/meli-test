module.exports = {
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	plugins: [
		// Airbnb config already imports 'import', 'jsx-a11y', 'react', and 'react-hooks',
		// so it's not necessary to import them here.
		'jsdoc',
	],
	extends: [
		'eslint:recommended',
		// eslint-config-airbnb imports eslint-plugin-import, eslint-plugin-react,
		// eslint-plugin-react-hooks, and eslint-plugin-jsx-a11y but don't extend their
		// recommended rules. Insted, they create their own ones. So I extend the
		// recommended rules in those plugins before the Airbnb config in case there's
		// a missing rule in the the Airbnb config.
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:jsx-a11y/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		// Airbnb styleguide is pretty robust, so there's no need to use Prettier here
		// if the eslint fix script is correctly hooked to git events.
		'airbnb', // The default export only includes import, a11y and react
		'airbnb/hooks', // Airbnb hooks should be included separately
		'plugin:jsdoc/recommended',
	],
	rules: {
		// "off" or 0 - turn the rule off
		// "warn" or 1 - turn the rule on as a warning (doesn't affect exit code)
		// "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
		'no-tabs': 0,
		'indent': [1, 'tab'],
		'max-len': [1, {
			code: 100,
			ignoreUrls: true,
			ignoreComments: false,
			ignoreRegExpLiterals: true,
			ignoreStrings: true,
			ignoreTemplateLiterals: true,
		}],
		'no-console': 0,
		'no-unused-vars': [1],
		'no-param-reassign': [2, {props: false}],
		'no-restricted-syntax': 1,
		'no-use-before-define': 1,
		'operator-linebreak': [2, 'before'],
		'object-curly-spacing': [1, 'never'],
		'object-curly-newline': [2, {consistent: true}],
		'quote-props': [2, 'consistent-as-needed'],
		'array-bracket-spacing': [1, 'never'],
		'comma-dangle': [2, 'always-multiline'],
		'no-underscore-dangle': 0,
		'import/extensions': [2, 'ignorePackages'],
		'import/prefer-default-export': 0,
		'import/no-extraneous-dependencies': [2, {
			devDependencies: true,
			optionalDependencies: false,
			peerDependencies: false,
			bundledDependencies: false,
		}],
		'no-else-return': [2, {allowElseIf: true}],
		'valid-jsdoc': ['error', {prefer: {return: 'returns'}}],
		'react/prop-types': [1, {ignore: ['children']}],
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
	},
};
