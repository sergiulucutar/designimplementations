import React from 'react';

export default class Home extends React.Component {

  constructor() {
    super();

    this.state = {
      slider: {
        index: 1
      }
    };

    this.slide = this.slide.bind(this);
  }

  slide() {
    
  }

  render() {
    return (
      <section className="page" id="home">
        <div className="logo">Logo</div>
        <article>
        <h2>Mark Smith</h2>
        <p>In sodales sagittis erat, non iaculis est laoreet eget. Proin id sagittis ex. Sed a augue mi. Nam quis suscipit dolor. Integer egestas ultricies felis, a molestie tortor fringilla a. Nunc sit amet pulvinar elit, id porttitor turpis. Nulla facilisi. Phasellus efficitur semper interdum. Donec blandit facilisis tincidunt. Sed a ante id massa lobortis dictum sed non libero. Integer eget arcu vel mi rutrum rutrum ac et purus. Curabitur faucibus ut lacus at pellentesque. Cras purus erat, dictum eu nibh a, interdum semper nisi. </p>
        </article>
        <div className="image_top">
          <div className="layer"></div>
          <div className="layer"></div>
          <div className="layer"></div>
          <div className="layer"></div>
        </div>
        <div className="image_bottom">
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
        </div>
        <div className="hero_button hero_button-next">
          <button onClick={this.slide}>Next</button>
        </div>
        <div className="hero_button hero_button-prev">
          <button>Prev</button>
        </div>
        <div className="hero_index">
          <span>1 / 3</span>
        </div>
        <menu>
          <a href="">Something</a>
          <a href="">Something</a>
        </menu>
      </section>
    );
  }
}
