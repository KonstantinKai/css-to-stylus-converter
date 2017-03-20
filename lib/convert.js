const css = require('css');
const _ = require('lodash');

const createNode = require('./create-node');
const processRule = require('./process-rule');
const processDeclaration = require('./process-declaration');

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

	const colorVariables = [];
	const colorProperties = [
		'background', 'border',
		'box-shadow', 'text-shadow',
		'background-color', 'border-color',
		'color'
	];

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
						if (unprefix && rule.property.match(/^-\w+-[\w\-]+$/) !== null) return false;

						let ruleValue = rule.value;
						let colorR = /(#[0-9a-f]{3,8}|(rgb|hsl)a?\([\d\.\s,\/%]+\))/gi;
						let match;

						if (createColorVariables && _.includes(colorProperties, rule.property)) {
							ruleValue = ruleValue.replace(colorR, (match, m1) => {
								let idx = colorVariables.indexOf(m1);
								
								return idx === -1 && `$color-${colorVariables.push(m1)}` || `$color-${idx + 1}`;
							});
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

	if (colorVariables.length) {
		source = colorVariables.map((color, idx) => {
			return `$color-${idx + 1} = ${color}`;
		}).concat([''], source);
	}

	return source.join('\n');
};