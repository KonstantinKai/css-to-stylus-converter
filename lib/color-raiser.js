const COLOR_PROPS = [
	'background', 'border',
	'box-shadow', 'text-shadow',
	'background-color', 'border-color',
	'color', 'border-top', 'border-left',
	'border-right', 'border-bottom'
];

const CSS_COLOR_R = /(#([0-9a-f]{3,8})|(rgb|hsl)a?\([\d\.\s,\/%]+\))/gi;

module.exports = (options = {}) => {
	const colorVariables = [];
	const variablePrefix = options.colorPrefix || '$color-';

	return {
		raise: (prop, value) => {
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

					let idx = colorVariables.indexOf(m1);
					
					return idx === -1 && `${variablePrefix}${colorVariables.push(m1)}` || `${variablePrefix}${idx + 1}`;
				});
			}

			return false;
		},
		getVariables: () => {
			return colorVariables.map((color, idx) => {
				return `${variablePrefix}${idx + 1} = ${color}`;
			});
		}
	}
};