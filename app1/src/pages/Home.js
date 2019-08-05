import React from 'react';
import SliderLayer from '../components/sliderlayer';

export default class Home extends React.Component {

  constructor() {
    super();

    const images = [
      'https://images.unsplash.com/photo-1526621553736-d0cfb8b59b76?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1455504490126-80ed4d83b3b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1527708355338-7ef37c8d68e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ];

    this.state = {
      slider: {
        index: 1,
        count: images.length,
        images
      }
    };

    this.slide = this.slide.bind(this);
  }

  slide() {
    const nextIndex = this.state.slider.index % this.state.slider.count + 1;
    
    this.setState({
      ...this.state,
      slider: {
        ...this.state.slider,
        index: nextIndex
      }
    });
  }

  render() {
    return (
      <section className="page" id="home">
        <div className="logo">CORNERS</div>
        <section className="articles">
          <SliderLayer sliderIndex={this.state.slider.index} index={1} key={0}>
            <article>
              <h2>Mark Smith</h2>
              <p>In sodales sagittis erat, non iaculis est laoreet eget. Proin id sagittis ex. Sed a augue mi. Nam quis suscipit dolor. Integer egestas ultricies felis, a molestie tortor fringilla a. Nunc sit amet pulvinar elit, id porttitor turpis. Nulla facilisi. Phasellus efficitur semper interdum. Donec blandit facilisis tincidunt. Sed a ante id massa lobortis dictum sed non libero. Integer eget arcu vel mi rutrum rutrum ac et purus. Curabitur faucibus ut lacus at pellentesque. Cras purus erat, dictum eu nibh a, interdum semper nisi. </p>
            </article>
          </SliderLayer>
          <SliderLayer sliderIndex={this.state.slider.index} index={2} key={1}>
            <article>
              <h2>Samanth Sam</h2>
              <p>Duis pharetra ut dui vitae congue. Etiam quis luctus felis. Donec at justo elementum, egestas metus facilisis, elementum libero. Etiam sit amet augue ornare, dignissim neque nec, sodales nunc. In hac habitasse platea dictumst. Integer ultricies lacus id libero rhoncus, ac volutpat sapien eleifend.</p>
            </article>
          </SliderLayer>
          <SliderLayer sliderIndex={this.state.slider.index} index={3} key={2}>
            <article>
              <h2>Hazy Dasy</h2>
              <p>Quisque malesuada convallis magna, sed rhoncus neque iaculis vel. Morbi tristique quam et lectus feugiat, vel dignissim nunc consectetur. Mauris vehicula porta metus ut semper. Vestibulum sit amet velit at leo mollis ultricies. Fusce nec mi porttitor, sagittis quam nec, placerat enim. </p>
            </article>
          </SliderLayer>
        </section>
        <div className="image_top">
          {
            this.state.slider.images.map((img, i) =>
              <SliderLayer bgImg={img} sliderIndex={this.state.slider.index} index={i + 1} key={i} />
            )
          }
        </div>
        <div className="image_bottom">
          {
            this.state.slider.images.map((img, i) =>
              <SliderLayer bgImg={img} sliderIndex={this.state.slider.index} index={i + 1} key={i} />
            )
          }
        </div>
        <div className="hero_button hero_button-next">
          <button onClick={this.slide}>Next</button>
        </div>
        <div className="hero_button hero_button-prev">
          <button>Prev</button>
        </div>
        <div className="hero_index">
          <span><span className="hero_index_digit">{this.state.slider.index}</span> / {this.state.slider.count}</span>
        </div>
        <menu>
          <a href="">Something</a>
          <a href="">Something</a>
        </menu>
        <div className="color-splash">
        </div>
      </section>
    );
  }
}
