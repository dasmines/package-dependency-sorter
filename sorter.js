module.exports = {
	sort
};

function sort(packages) {
	let sortedPackages = [];
	const packageMap = {};

	packages.forEach((package) => {
		if (!package.includes(': ')) {
			throw Error(`Invalid Input: all packages are not in the correct format (package: dependency)`);
		}
		const [packageName, dependency] = package.split(': ');
		packageMap[packageName] = dependency;
	});

	for (let [packageName, dependency] of Object.entries(packageMap)) {
		if (sortedPackages.includes(packageName)) continue;
		const dependencies = [packageName];
		if (!dependency || sortedPackages.includes(dependency)) {
			sortedPackages.push(packageName);
		} else {
			let currentDependency = dependency;
			while (currentDependency && !sortedPackages.includes(currentDependency)) {
				if (dependencies.includes(currentDependency)) {
					dependencies.unshift(currentDependency);
					throw Error(`Invalid Input: contains a cycle (${dependencies.reverse().join(' -> ')})`);
				}
				dependencies.unshift(currentDependency);
				currentDependency = packageMap[currentDependency];
			}
			sortedPackages = sortedPackages.concat(dependencies);
		}
	}
	return sortedPackages.join(', ');
}