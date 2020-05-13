export class Utils {
  static get palette() {
    return {
      white: '#e0e2db',
      purple: '#3d348b'
    };
  }

  static random(min = 0, max = 1) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static splitText(text) {
    const html = '';
    text.forEach(c => (html += `<span class="char">${c}</span>`));
    return html;
  }
}
