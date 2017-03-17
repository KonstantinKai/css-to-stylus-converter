module.exports = function createNode (root, key, declaration) {
	if (!root.has(key)) {
		root.set(key, new Map([
			['children', new Map()],
			['rules', new Set()],
			['declaration', declaration || key]
		]));
	}

	return root.get(key);
}