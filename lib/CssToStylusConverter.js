const css = require('css');
const _ = require('lodash');

const ColorRaiser = require('./ColorRaiser');

module.exports = class CssToStylusConverter {
	constructor (options = {}) {
		this.nodes = new Map();
		this.source = [];

		this.indent = _.isNumber(options.indent) ? `${_.repeat(' ', options.indent)}` : '\t';
		this.unprefix = options.unprefix || false;
		this.keepColons = options.keepColons || false;
		this.cssSyntax = options.cssSyntax || false;
		this.separateRules = options.separateRules || false;
		this.removeComments = options.removeComments || false;
		this.createColorVariables = options.colorVariables || false;

		this.colon = this.keepColons || this.cssSyntax ? ':' : '';
		this.openBracket = this.cssSyntax ? '{' : '';
		this.closeBracket = this.cssSyntax ? '}' : '';
		this.semicolon = this.cssSyntax ? ';' : '';

		this.colorRaiser = new ColorRaiser(options);
	}

	getCssAst (cssSource) {
		let cssAst = false;

		try {
			cssAst = css.parse(cssSource);
		} catch (e) {} finally {
			return cssAst;
		}
	}

	convert (cssSource) {
		const cssAst = this.getCssAst(cssSource);

		if (cssAst === false) return false;

		this.fillNodes(cssAst);

		return this.getSource();
	}

	fillNodes (cssAst) {
		cssAst.stylesheet.rules.forEach(rule => {
			return this.walkRules(rule, this.nodes);
		});
	}

	concat (node, level = 1) {
		let source = this.source;

		let declarationIndentLevel = _.repeat(this.indent, level - 1);
		let declaration = node.get('declaration').replace(/\n/g, `\n${declarationIndentLevel}`);

		let rules = node.get('rules');
		let children = node.get('children');
		let hasDeclarations = rules.size || children.size;

		if (node.get('type') === 'rule' && !hasDeclarations) return false;

		source.push(`${declarationIndentLevel}${declaration}`);

		if (this.cssSyntax && hasDeclarations) source[source.length - 1] += ` ${this.openBracket}`;
		
		if (rules.size) {
			rules.forEach(rule => {
				switch (rule.type) {
					case 'declaration':
						let vendorPrefixR = /^-\w+-.+$/;

						if (this.unprefix) {
							if (vendorPrefixR.test(rule.property)) return false;
							if (vendorPrefixR.test(rule.value)) return false;
						}

						let ruleValue = rule.value;

						if (this.createColorVariables) {
							let colorRaised = this.colorRaiser.raise(rule.property, ruleValue);

							if (colorRaised !== false) ruleValue = colorRaised;
						}

						source.push(`${_.repeat(this.indent, level)}${rule.property}${this.colon} ${ruleValue}${this.semicolon}`);
					break;
					case 'comment':
						source.push(`${_.repeat(this.indent, level)}/*${rule.comment}*/`);
					break;
				}
			});
		}

		if (children.size) {
			let i = 1;
			children.forEach((node, key) => {
				if (this.separateRules && i === 1 && rules.size) source.push('');

				this.concat(node, level + 1);

				if (this.separateRules && i < children.size) source.push('');

				i++;
			});
		}

		if (this.cssSyntax && hasDeclarations) {
			source.push(`${_.repeat(this.indent, level - 1)}${this.closeBracket}`);
		}

		if (this.separateRules && level === 1) source.push('');
	}

	getSource () {
		this.nodes.forEach((node) => {
			return this.concat(node);
		});

		if (this.createColorVariables) {
			let colorVariables = this.colorRaiser.getVariables();

			if (colorVariables.length) {
				this.source = colorVariables.concat([''], this.source);
			}
		}

		return this.source.join('\n');
	}

	walkRules (rule, root) {
		switch (rule.type) {
			case 'media':
				let mediaNode = this.createNode(root, rule.media, `@media ${rule.media}`, 'media');

				rule.rules.forEach(mediaRule => {
					this.walkRules(mediaRule, mediaNode.get('children'));
				});
			break;
			case 'keyframes':
				if (this.unprefix && !_.isUndefined(rule.vendor)) return false;

				let vendor = !_.isUndefined(rule.vendor) ? `${rule.vendor}` : '';
				let nodeKey = `${vendor}${rule.type}-${rule.name}`;
				let keyframeNode = this.createNode(root, `${nodeKey}`, `@${vendor}${rule.type} ${rule.name}`, 'keyframes');

				rule.keyframes.forEach(keyframe => {
					if (keyframe.type === 'comment') return this.walkRules(keyframe, keyframeNode.get('children'));

					let value = _.head(keyframe.values);

					this.processRule([_.uniqueId(`${nodeKey}-${value}`)], keyframe, `${value}`, keyframeNode.get('children'));
				});
			break;
			case 'rule':
				this.processDeclaration(rule, root);
			break;
			case 'font-face':
				this.processRule([_.uniqueId('font-face')], rule, `@${rule.type}`, root);
			break;
			case 'comment':
				if (this.removeComments) return false;

				this.processRule([_.uniqueId(`${rule.type}`)], rule, `/*${rule[rule.type]}*/`, root);
			break;
			case 'namespace':
			case 'import':
			case 'charset':
				this.processRule([_.uniqueId(`${rule.type}`)], rule, `@${rule.type} ${rule[rule.type]}`, root);
			break;
		}
	}

	createNode (root, key, declaration, type) {
		if (!root.has(key)) {
			root.set(key, new Map([
				['children', new Map()],
				['rules', new Set()],
				['declaration', declaration || key],
				['type', type]
			]));
		}

		return root.get(key);
	}

	processRule (parts = [], rule, declaration, root) {
		parts.reduce((children, selector, idx, arr) => {
			let child = this.createNode(children, selector, declaration, rule.type);

			if (idx === arr.length - 1 && rule.declarations) {
				rule.declarations.forEach(decl => {
					if (this.removeComments && decl.type === 'comment') return false;

					if (decl.type === 'declaration') {
						if (!decl.value.length) return false;
						if (decl.property === 'filter' && decl.value.match(/alpha|microsoft/i)) return false;
					}

					return child.get('rules').add(decl);
				});
			}

			return child.get('children');
		}, root);
	}

	processDeclaration (rule, root) {
		rule.selectors.some((path, idx, arr) => {
			let match;
			let buff = [];

			while ((match = path.match(/^(.*)?(([>~+])+(.*)?)/))) {
				buff.push(` ${match[3]}${_.trimStart(match[4])}`);
				path = _.trimEnd(path.replace(match[2], ''));
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

			this.processRule(parts, rule, null, root);

			if (arr.length > 1) return true;
		});
	}
}