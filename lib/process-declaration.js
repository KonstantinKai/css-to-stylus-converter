const processRule = require('./process-rule');
const _ = require('lodash')

module.exports = function processDeclaration (rule, root) {
	rule.selectors.some((path, idx, arr) => {
		let match;
		let buff = [];

		while ((match = path.match(/^(.*)?(([>~+])+(.*)?)/))) {
			buff.push(` ${match[3]}${_.trimStart(match[4])}`);
			path = path.replace(match[2], '');
		}

		if (buff.length) path = `${_.trimEnd(path)}${buff.reverse().join('')}`;

		let pathArr = arr.length > 1 ? [arr.join('\n')] : path.split(' ');

		let parts = pathArr.reduce((acc, sel, idx, arr) => {
			let match;
			let childs = [];

			while ((match = sel.match(/^[~+>]?[#\.\w]{1}[\w\-\[\]=~|^*$]*(:\w+\([\w\.#:-]+\)|[#\.]{1}[\w\-]+|:[\w\-()\.]+)/))) {
				childs.push(`&${match[1]}`);

				sel = sel.replace(match[1], '');
			}

			return acc.concat(sel, childs);
		}, []);

		processRule(parts, rule, null, root);

		if (arr.length > 1) return true;
	});
};