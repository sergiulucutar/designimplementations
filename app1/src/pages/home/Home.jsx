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
        total: images.length,
        images,
        reverse: false
      }
    };

    this.slide = this.slide.bind(this);
  }

  normalizeIndex(index) {
    const { total } = this.state.slider;
    if(!index || index === total) {
      return total;
    }
    return (index + total) % total;
  }

  getLayerDisplayClasses(layerIndex) {
    const {reverse, index} = this.state.slider;
    let classes = '';

    if(layerIndex === index) {
      classes += ' layer-displayed';
    }

    if(reverse) {
      classes += ' reverse';

      if(layerIndex === this.normalizeIndex(index + 1)) {
        classes += ' layer-displayed-prev';
      }
    }
    else if(layerIndex === this.normalizeIndex(index - 1)) {
      classes += ' layer-displayed-prev'
    }

    return classes;
  }

  slide(reverse = false) {
    if(reverse) {
      this.state.slider.index += this.state.slider.total - 2;
    }
    const nextIndex = this.state.slider.index % this.state.slider.total + 1;

    this.setState({
      ...this.state,
      slider: {
        ...this.state.slider,
        index: nextIndex,
        reverse
      }
    })
  }

  render() {
    const {index, images, total} = this.state.slider;

    return (
      <section className="page" id="home">
        <div className="logo">CORNERS</div>
        <section className="articles">
          <SliderLayer className={this.getLayerDisplayClasses(1)} key={0}>
            <h1>Fancy Stuff</h1>
            <button className="corners-hover">View Collection</button>
          </SliderLayer>
          <SliderLayer className={this.getLayerDisplayClasses(2)} key={1}>
            <h1>Casual Robes</h1>
            <button className="corners-hover">View Collection</button>
          </SliderLayer>
          <SliderLayer className={this.getLayerDisplayClasses(3)} key={2}>
            <h1>Wild Night</h1>
            <button className="corners-hover">View Collection</button>
          </SliderLayer>
        </section>
        <div className="image_top">
          {
            images.map((img, i) => {
              return <SliderLayer bgImg={img} className={this.getLayerDisplayClasses(i + 1)} key={i} />
            }
            )
          }
        </div>
        <div className="image_bottom">
          {
            images.map((img, i) =>
              <SliderLayer bgImg={img} className={this.getLayerDisplayClasses(i + 1)} key={i} />
            )
          }
        </div>
        <div className="hero_button hero_button-next">
          <button onClick={() => this.slide(false)}>Next</button>
        </div>
        <div className="hero_button hero_button-prev">
          <button onClick={() => this.slide(true)}>Prev</button>
        </div>
        <div className="hero_index">
          <span><span className="hero_index_digit">{index}</span> / {total}</span>
        </div>
        {/* <menu>
          <a href="" className="corners-hover">Something</a>
          <a href="" className="corners-hover">Something</a>
        </menu> */}
        <div className="color-splash">
        </div>
      </section>
    );
  }
}
