module.exports = {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-sass-guidelines',
		'stylelint-config-idiomatic-order',
	],
	rules: {
		// For the primary option null turns the rule off and any other value turns it on.
		// The value of that primary option depends on the rule.
		// If an array is provided Stylelint expects the first element to be the primary
		// option and the second should be an object with configurations about that rule.
		// Some configuration are common to all rules and others are particular.
		// https://stylelint.io/user-guide/configure
		'indentation': 'tab',
		'order/properties-alphabetical-order': null,
		'scss/selector-no-redundant-nesting-selector': null,
		'max-nesting-depth': 4,
		'selector-max-id': 1,
		'color-hex-case': 'upper',
	},
};
