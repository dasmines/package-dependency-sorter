const expect = require('chai').expect;

describe('sorter', () => {
	let sorter = require('../../sorter.js');
	const KittenService = 'KittenService';
	const CamelCaser = 'CamelCaser';
	const Leetmeme = 'Leetmeme';
	const Cyberportal = 'Cyberportal';
	const Ice = 'Ice';
	const Fraudstream = 'Fraudstream';
	describe('when determining the order to install packages', () => {
		describe('given packages that have dependencies', () => {
			it('puts the dependencies before the dependent packages', () => {
				const packages = [`${KittenService}: ${CamelCaser}`, `${CamelCaser}: `];
				const expected = `${CamelCaser}, ${KittenService}`;
				const sorted = sorter.sort(packages);
				expect(sorted).to.equal(expected);
			});
			it('rejects input as invalid if there are dependency cycles', () => {
				const packages = [`${KittenService}: `, `${Leetmeme}: ${Cyberportal}`, `${Cyberportal}: ${Ice}`, `${CamelCaser}: ${KittenService}`, `${Fraudstream}: `, `${Ice}: ${Leetmeme}`];
				expect(() => sorter.sort(packages)).to.throw(`Invalid Input: contains a cycle (${Leetmeme} -> ${Cyberportal} -> ${Ice} -> ${Leetmeme})`);
			});
			it('rejects input as invalid if packages are not given in the appropriate format (package: dependency)', () => { });
		});
		describe('given only packages without dependencies', () => {
			it('returns the packages in the given order', () => {
				const packages = [`${KittenService}: `, `${CamelCaser}: `];
				const expected = `${KittenService}, ${CamelCaser}`;
				const sorted = sorter.sort(packages);
				expect(sorted).to.equal(expected);
			});
		});
	});
});