module.exports = {
	sort
};

function sort(packages) {
	let sortedPackages = [];
	const packageMap = parsePackages(packages);
	for (let [packageName, dependency] of Object.entries(packageMap)) {
		if (sortedPackages.includes(packageName)) continue;
		const dependencies = [packageName];
		if (dependency && !sortedPackages.includes(dependency)) {
			let currentDependency = dependency;
			while (currentDependency && !sortedPackages.includes(currentDependency)) {
				if (dependencies.includes(currentDependency)) {
					throw new Error(`Invalid Input: contains a cycle (${[currentDependency, ...dependencies].reverse().join(' -> ')})`);
				}
				dependencies.unshift(currentDependency);
				if (!packageMap.hasOwnProperty(currentDependency)) {
					throw new Error(`Invalid Input: ${currentDependency} is not in the list of packages`);
				}
				currentDependency = packageMap[currentDependency];
			}
		}
		sortedPackages = sortedPackages.concat(dependencies);
	}
	return sortedPackages.join(', ');
}

function parsePackages(packages) {
	const packageMap = {};
	packages.forEach((pkg) => {
		if (!pkg.includes(': ')) {
			throw new Error(`Invalid Input: ${pkg} is not in the correct format (package: dependency)`);
		}
		const [packageName, dependency] = pkg.split(': ');
		packageMap[packageName] = dependency;
	});
	return packageMap;
}