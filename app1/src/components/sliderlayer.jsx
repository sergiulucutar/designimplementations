import React from 'react';

export default class SliderLayer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            ...nextProps
        };
    }

    render() {
        const {sliderIndex, index, bgImg} = this.state;
        const classes = `layer ${sliderIndex == index ? 'layer-displayed' : ''} ${(sliderIndex + 1) % 3 + 1 == index ? 'layer-displayed-prev' : ''}`;

        return (
            <div
            className={classes}
            style={{backgroundImage: `url(${bgImg})`}}></div>
        );
    }
}