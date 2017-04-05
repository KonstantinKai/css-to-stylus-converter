const COLOR_PROPS = [
	'background', 'border',
	'box-shadow', 'text-shadow',
	'background-color', 'border-color',
	'color', 'border-top', 'border-left',
	'border-right', 'border-bottom', 'filter',
	'border-bottom-color', 'border-top-color',
	'border-right-color', 'border-left-color'
];

const CSS_COLOR_R = /(#([0-9a-f]{3,8})|(rgb|hsl)a?\([\d\.\s,\/%]+\))/gi;

module.exports = class ColorRaiser {
	constructor (options) {
		this.colorVariables = [];
		this.variablePrefix = options.colorPrefix || '$color-';
	}

	raise (prop, value) {
		if (~COLOR_PROPS.indexOf(prop)) {
			return value.replace(CSS_COLOR_R, (match, m1, m2) => {
				if (m2) {
					if (m2.length > 3) {
						let mbShortHex = m2.split('').reduce((prev, cur) => {
							return cur === prev && cur;
						});

						if (mbShortHex !== false) m1 = `#${m2.slice(0, 3)}`;
					}

					m1 = m1.toLowerCase();
				}

				let idx = this.colorVariables.indexOf(m1);
				
				return idx === -1 && `${this.variablePrefix}${this.colorVariables.push(m1)}` || `${this.variablePrefix}${idx + 1}`;
			});
		}

		return false;
	}

	getVariables () {
		return this.colorVariables.map((color, idx) => {
			return `${this.variablePrefix}${idx + 1} = ${color}`;
		});
	}
};