const CssToStylusConverter = require('./CssToStylusConverter');

module.exports = (cssSource, options) => {
	const converter = new CssToStylusConverter(options);

	return converter.convert(cssSource);
};