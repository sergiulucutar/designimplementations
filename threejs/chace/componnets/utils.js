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
}
