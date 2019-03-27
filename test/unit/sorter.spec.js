const expect = require('chai').expect;

describe('sorter', () => {
	let sorter = require('../../sorter.js');
	const KittenService = "KittenService";
	const CamelCaser = "CamelCaser";
	describe('when determining the order to install packages', () => {
		describe('given packages that have dependencies', () => {
			it('puts the dependencies before the dependent packages', () => { });
			it('rejects input as invalid if there are dependency cycles', () => { });
			it('rejects input as invalid if packages are not given in the appropriate format (package: dependency)', () => { });
		});
		describe('given only packages without dependencies', () => {
			it('returns the packages in the given order', () => {
				const packages = [`${KittenService}: `, `${CamelCaser}: `];
				const expected = `${KittenService}, ${CamelCaser}`;
				const sorted = sorter.sort(packages);
				expect(sorted).to.deep.equal(expected);
			});
		});
	});
});