module.exports = {
	sort
};

function sort(packages) {
	const packageMap = {};
	packages.forEach((package) => {
		const [packageName, dependency] = package.split(': ');
		packageMap[packageName] = dependency;
	});
	if (!Object.values(packageMap).some(x => !!x)) {
		return Object.keys(packageMap).join(', ');
	}
}