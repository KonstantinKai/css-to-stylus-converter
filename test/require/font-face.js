'use strict';

module.exports = (test) => {
	describe('font-face', function () {
		test([
			[
				[
					`@font-face {`,
					`	font-family: Open_Sans_Bold;`,
					`	src: url("../fonts/opensans-bold-webfont.woff") format("woff"), url("../fonts/opensans-bold-webfont.ttf") format("truetype"), url("../fonts/opensans-bold-webfont.svg#Open_Sans_Bold") format("svg");`,
					`	font-weight: 400;`,
					`	font-style: \'normal\'`,
					`}`
				].join('\n'),
				[
					`@font-face`,
					`	font-family Open_Sans_Bold`,
					`	src url("../fonts/opensans-bold-webfont.woff") format("woff"), url("../fonts/opensans-bold-webfont.ttf") format("truetype"), url("../fonts/opensans-bold-webfont.svg#Open_Sans_Bold") format("svg")`,
					`	font-weight 400`,
					`	font-style \'normal\'`
				].join('\n')
			],
		]);
	});
};