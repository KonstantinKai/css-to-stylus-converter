'use strict'

const CssToStylusConverter = require('./CssToStylusConverter');

module.exports = (cssSource, options) => {
	return new CssToStylusConverter(options).convert(cssSource);
};