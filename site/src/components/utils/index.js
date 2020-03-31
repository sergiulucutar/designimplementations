export class Utils {
  static get palette() {
    return {
      red: '#E1073E',
      yellow: '#F9DC5C',
      white: '#F4FFFD',
      blue: '#011936',
      black: '#090C08'
    };
  }

  static get paletteArray() {
    return ['#E1073E', '#F9DC5C', '#011936'];
  }

  static random(min = 0, max = 1) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
