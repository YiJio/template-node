// may want to use lodash library package

export const HelperUtil = {
	range(start, end) {
		if (start === end) return [start];
		return [start, ...this.range(start + 1, end)];
	},
	normalize(val, min, max) {
		return (val - min) / (max - min);
	},
	randomNumber(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	removeDuplicates(arr) {
		return [...new Set(arr)];
	},
	isArray(arr) {
		return Array.isArray(arr);
	},
	isObject(obj) {
		return typeof obj === 'object' && obj !== null;
	},
	isFunction(func) {
		return typeof func === 'function';
	},
	isEmpty(val) {
		return val === null || val == undefined || (typeof val === 'string' && val.trim() === '') || (this.isArray(val) && val.length === 0) || (typeof val === 'object' && Object.keys(val).length === 0);
	},
	deepClone(obj) {
		return JSON.parse(JSON.stringify(obj));
	},
	mergeObjects(target, source) {
		return Object.assign({}, target, source);
	},
	getFromIndex(array, fieldCheck, value, returnField = null) {
		const index = array.findIndex((a) => a[fieldCheck] == value);
		if (returnField) return array[index][returnField];
		return array[index];
	},
	parsePlainTextList(punct, content) {
		const lines = content.trim().split('\n');
		const list = lines.filter(line => line.trim().startsWith(punct)).map(line => line.trim().substring(1).trim());
		return list;
	}
}