'use strict';

module.exports = (test) => {
	describe('comments', function () {
		test([
			['/* comment */', '/* comment */'],
			[`/* line1
			line2
			*/`, `/* line1
			line2
			*/`],
			['/* comment */', '', {removeComments: true}],
			[`/* comment */
			.class-1 {
				display: block;
				/*padding: 0;*/
			}`, [
				'/* comment */',
				'.class-1',
				'\tdisplay block',
				'\t/*padding: 0;*/'
			].join('\n')],
			[`/* comment */
			.class-1 {
				display: block;
				/*padding: 0;*/
			}`, [
				'.class-1',
				'\tdisplay block',
			].join('\n'), {removeComments: true}]
		]);
	});
};