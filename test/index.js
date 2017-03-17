const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const cssToStylus = require('../');

function test (inputData = []) {
	inputData.forEach((data, idx) => {
		it(`test #${idx + 1}`, function () {
			expect(cssToStylus(data[0], data[2] || {})).to.be.equal(data[1]);
		});
	});
}

describe('Css to Stylus converter', function () {
	const rules = path.resolve(__dirname, 'require');

	fs.readdirSync(rules).forEach(file => {
		require(path.resolve(rules, file))(test);
	});
});