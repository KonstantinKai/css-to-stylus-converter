const createNode = require('./create-node');

module.exports = function processRule (parts = [], rule, declaration, root) {
	parts.reduce((children, selector, idx, arr) => {
		let child = createNode(children, selector, declaration);

		if (idx === arr.length - 1 && rule.declarations) {
			rule.declarations.forEach(decl => (child.get('rules').add(decl)));
		}

		return child.get('children');
	}, root);
};