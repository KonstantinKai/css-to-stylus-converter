const css = require('css');
const _ = require('lodash');

const createNode = require('./create-node');
const processRule = require('./process-rule');
const processDeclaration = require('./process-declaration');
const colorRaiser = require('./color-raiser');

module.exports = function convert (cssSource, options = {}) {
	const cssAst = css.parse(cssSource);
	const nodes = new Map();

	const indent = _.isNumber(options.indent) ? `${_.repeat(' ', options.indent)}` : '\t';
	const unprefix = options.unprefix || false;
	const keepColons = options.keepColons || false;
	const cssSyntax = options.cssSyntax || false;
	const separateRules = options.separateRules || false;
	const removeComments = options.removeComments || false;
	const createColorVariables = options.colorVariables || false;

	const colon = keepColons || cssSyntax ? ':' : '';
	const openBracket = cssSyntax ? '{' : '';
	const closeBracket = cssSyntax ? '}' : '';
	const semicolon = cssSyntax ? ';' : '';

	const raiseColor = colorRaiser(options);

	function walkRules (rule, root) {
		switch (rule.type) {
			case 'media':
				let mediaNode = createNode(root, rule.media, `@media ${rule.media}`);

				rule.rules.forEach(mediaRule => {
					walkRules(mediaRule, mediaNode.get('children'));
				});
			break;
			case 'keyframes':
				if (unprefix && !_.isUndefined(rule.vendor)) return false;

				let vendor = !_.isUndefined(rule.vendor) ? `${rule.vendor}` : '';
				let nodeKey = `${vendor}${rule.type}-${rule.name}`;
				let keyframeNode = createNode(root, `${nodeKey}`, `@${vendor}${rule.type} ${rule.name}`);

				rule.keyframes.forEach(keyframe => {
					if (keyframe.type === 'comment') return walkRules(keyframe, keyframeNode.get('children'));

					let value = _.head(keyframe.values);

					processRule([_.uniqueId(`${nodeKey}-${value}`)], keyframe, `${value}`, keyframeNode.get('children'));
				});
			break;
			case 'rule':
				processDeclaration(rule, root);
			break;
			case 'font-face':
				processRule([_.uniqueId('font-face')], rule, `@${rule.type}`, root);
			break;
			case 'comment':
				if (removeComments) return false;

				processRule([_.uniqueId(`${rule.type}`)], rule, `/*${rule[rule.type]}*/`, root);
			break;
			case 'namespace':
			case 'import':
			case 'charset':
				processRule([_.uniqueId(`${rule.type}`)], rule, `@${rule.type} ${rule[rule.type]}`, root);
			break;
		}
	}

	cssAst.stylesheet.rules.forEach(rule => {
		return walkRules(rule, nodes);
	});

	let source = [];

	function concat (node, level = 1) {
		const declarationIndentLevel = _.repeat(indent, level - 1);
		let declaration = node.get('declaration').replace(/\n/g, `\n${declarationIndentLevel}`);

		source.push(`${declarationIndentLevel}${declaration}`);

		let rules = node.get('rules');
		let children = node.get('children');
		let hasDeclarations = rules.size || children.size;

		if (cssSyntax && hasDeclarations) source[source.length - 1] += ` ${openBracket}`;
		
		if (rules.size) {
			rules.forEach(rule => {
				switch (rule.type) {
					case 'declaration':
						let vendorPrefixR = /^-\w+-.+$/;

						if (unprefix) {
							if (vendorPrefixR.test(rule.property)) return false;
							if (vendorPrefixR.test(rule.value)) return false;
						}

						let ruleValue = rule.value;

						if (createColorVariables) {
							let colorRaised = raiseColor.raise(rule.property, ruleValue);

							if (colorRaised !== false) ruleValue = colorRaised;
						}

						source.push(`${_.repeat(indent, level)}${rule.property}${colon} ${ruleValue}${semicolon}`);
					break;
					case 'comment':
						if (removeComments) return false;

						source.push(`${_.repeat(indent, level)}/*${rule.comment}*/`);
					break;
				}
			});
		}

		if (children.size) {
			children.forEach((node, key) => {
				if (separateRules && rules.size) source.push('');

				return concat(node, level + 1);
			});
		}

		if (cssSyntax && hasDeclarations) {
			source.push(`${_.repeat(indent, level - 1)}${closeBracket}`);
		}

		if (separateRules && level === 1) source.push('');
	}

	nodes.forEach((node) => {
		return concat(node);
	});

	if (createColorVariables) {
		let colorVariables = raiseColor.getVariables();

		if (colorVariables.length) {
			source = raiseColor.getVariables().concat([''], source);
		}
	}

	return source.join('\n');
};