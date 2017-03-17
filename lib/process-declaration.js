const processRule = require('./process-rule');

module.exports = function processDeclaration (rule, root) {
	rule.selectors.some((path, idx, arr) => {
		let parts = arr.length > 1 ? [arr.join('\n')] : path.split(' ').reduce((acc, sel, idx, arr) => {
			let match;
			let childs = [];

			if (['~', '>', '+'].indexOf(sel) !== -1) {
				arr[idx + 1] = `${sel}${arr[idx + 1]}`;

				return acc;
			}

			while ((match = sel.match(/^[~+>]?[#\.]?[\w\-\[\]=~|^*$]+(:[\w\-()\.]+|[#\.]{1}[\w\-]+)/))) {
				childs.push(`&${match[1]}`);

				sel = sel.replace(match[1], '');
			}

			return acc.concat(sel, childs);
		}, []);

		processRule(parts, rule, null, root);

		if (arr.length > 1) return true;
	});
};