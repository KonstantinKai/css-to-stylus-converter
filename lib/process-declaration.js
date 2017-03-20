const processRule = require('./process-rule');
const _ = require('lodash')

module.exports = function processDeclaration (rule, root) {
	rule.selectors.some((path, idx, arr) => {
		path = path.replace(/^(.*)?([>~+])+(.*?)$/, (match, m1, m2, m3) => {
			return `${_.trimEnd(m1)} ${m2}${_.trimStart(m3)}`;
		});

		let pathArr = arr.length > 1 ? [arr.join('\n')] : path.split(' ');

		let parts = pathArr.reduce((acc, sel, idx, arr) => {
			let match;
			let childs = [];

			while ((match = sel.match(/^[~+>]?[#\.]?[\w\-\[\]=~|^*$]+(:\w+\([\w\.#:-]+\)|[#\.]{1}[\w\-]+|:[\w\-()\.]+)/))) {
				childs.push(`&${match[1]}`);

				sel = sel.replace(match[1], '');
			}

			return acc.concat(sel, childs);
		}, []);

		processRule(parts, rule, null, root);

		if (arr.length > 1) return true;
	});
};