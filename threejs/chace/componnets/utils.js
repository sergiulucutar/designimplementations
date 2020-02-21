export default class Utils {

	static random(min = 0, max = 1) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	static normalizeMousePosition([x, y]) {
		return [
			-1 + (x / window.innerWidth) * 2,
			1 - (y / window.innerHeight) * 2
		];
	}

	static getPositionOnSphere(height) {
		const theta = 2 * Math.PI * Math.random();
		const phi = Math.acos(2 * Math.random() - 1);
		return [
			height * Math.sin(phi) * Math.cos(theta),
			height * Math.sin(phi) * Math.sin(theta),
			height * Math.cos(phi)
		];
	}
}
