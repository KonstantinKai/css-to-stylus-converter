'use strict';

const expect = require('chai').expect;
const getCssAst = require('../../lib/CssToStylusConverter').getCssAst;

module.exports = () => {
	describe('main class', function () {
		it('test #1', function () {
			let ast = getCssAst('body {background: white no-repeat;}');

			expect(ast).to.have.property('type', 'stylesheet');
			expect(ast).to.have.property('stylesheet');
		});

		it('test #2', function () {
			expect(() => getCssAst('body {background white no-repeat;}')).to.throw();
		});
	});
}