import './home.scss';

import React from 'react';
import SliderLayer from '../../components/layer/sliderlayer';

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
            <h1>Fancy Stuff</h1>
            <button className="corners-hover">View Collection</button>
          </SliderLayer>
          <SliderLayer sliderIndex={this.state.slider.index} index={2} key={1}>
            <h1>Casual Robes</h1>
            <button className="corners-hover">View Collection</button>
          </SliderLayer>
          <SliderLayer sliderIndex={this.state.slider.index} index={3} key={2}>
            <h1>Summer Logoff</h1>
            <button className="corners-hover">View Collection</button>
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
          <a href="" className="corners-hover">Something</a>
          <a href="" className="corners-hover">Something</a>
        </menu>
        <div className="color-splash">
        </div>
      </section>
    );
  }
}
