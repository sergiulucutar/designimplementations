import './home.scss';

import React from 'react';
import SliderLayer from '../../components/layer/sliderlayer';

export default class Home extends React.Component {
  constructor() {
    super();

    const images = [
      './images/model_1.webp',
      './images/model_2.webp',
      './images/model_3.webp'
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
    if (!index || index === total) {
      return total;
    }
    return (index + total) % total;
  }

  getLayerDisplayClasses(layerIndex) {
    const { reverse, index } = this.state.slider;
    let classes = '';

    if (layerIndex === index) {
      classes += ' layer-displayed';
    }

    if (reverse) {
      classes += ' reverse';

      if (layerIndex === this.normalizeIndex(index + 1)) {
        classes += ' layer-displayed-prev';
      }
    } else if (layerIndex === this.normalizeIndex(index - 1)) {
      classes += ' layer-displayed-prev';
    }

    return classes;
  }

  slide(reverse = false) {
    if (reverse) {
      this.state.slider.index += this.state.slider.total - 2;
    }
    const nextIndex = (this.state.slider.index % this.state.slider.total) + 1;

    this.setState({
      ...this.state,
      slider: {
        ...this.state.slider,
        index: nextIndex,
        reverse
      }
    });
  }

  render() {
    const { index, images, total } = this.state.slider;

    return (
      <section className='page' id='home'>
        <div className='logo'>CORNERS</div>
        <section className='articles'>
          <SliderLayer className={this.getLayerDisplayClasses(1)} key={0}>
            <h1>Fancy Stuff</h1>
            <button className='corners-hover'>View Collection</button>
          </SliderLayer>
          <SliderLayer className={this.getLayerDisplayClasses(2)} key={1}>
            <h1>Casual Robes</h1>
            <button className='corners-hover'>View Collection</button>
          </SliderLayer>
          <SliderLayer className={this.getLayerDisplayClasses(3)} key={2}>
            <h1>Wild Night</h1>
            <button className='corners-hover'>View Collection</button>
          </SliderLayer>
        </section>
        <div className='image_top'>
          {images.map((img, i) => {
            return (
              <SliderLayer
                bgImg={img}
                className={this.getLayerDisplayClasses(i + 1)}
                key={i}
              />
            );
          })}
        </div>
        <div className='image_bottom'>
          {images.map((img, i) => (
            <SliderLayer
              bgImg={img}
              className={this.getLayerDisplayClasses(i + 1)}
              key={i}
            />
          ))}
        </div>
        <div className='hero_button hero_button-next'>
          <button onClick={() => this.slide(false)}>Next</button>
        </div>
        <div className='hero_button hero_button-prev'>
          <button onClick={() => this.slide(true)}>Prev</button>
        </div>
        <div className='hero_index'>
          <span>
            <span className='hero_index_digit'>{index}</span> / {total}
          </span>
        </div>
        {/* <menu>
          <a href="" className="corners-hover">Something</a>
          <a href="" className="corners-hover">Something</a>
        </menu> */}
        <div className='color-splash'></div>
      </section>
    );
  }
}
