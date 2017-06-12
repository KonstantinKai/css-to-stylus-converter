'use strict';

module.exports = (test) => {
	describe('simple at rules', function () {
		test([
			[
				[
					`@charset 'UTF-8';`,
					`@charset "iso-8859-15";`
				].join('\n'),
				[
					`@charset 'UTF-8'`,
					`@charset "iso-8859-15"`
				].join('\n'),
			],
			[
				[
					`@import url("fineprint.css") print;`,
					`@import url("bluish.css") projection, tv;`,
					`@import 'custom.css';`,
					`@import url("chrome://communicator/skin/");`,
					`@import "common.css" screen, projection;`,
					`@import url('landscape.css') screen and (orientation:landscape);`
				].join('\n'),
				[
					`@import url("fineprint.css") print`,
					`@import url("bluish.css") projection, tv`,
					`@import 'custom.css'`,
					`@import url("chrome://communicator/skin/")`,
					`@import "common.css" screen, projection`,
					`@import url('landscape.css') screen and (orientation:landscape)`
				].join('\n'),
			],
			[
				[
					`@namespace url(XML-namespace-URL);`,
					`@namespace "XML-namespace-URL";`,
					`@namespace prefix url(XML-namespace-URL);`,
					`@namespace prefix "XML-namespace-URL";`
				].join('\n'),
				[
					`@namespace url(XML-namespace-URL)`,
					`@namespace "XML-namespace-URL"`,
					`@namespace prefix url(XML-namespace-URL)`,
					`@namespace prefix "XML-namespace-URL"`
				].join('\n'),
			],
		]);
	});
};