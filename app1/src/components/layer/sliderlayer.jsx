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
        const {bgImg} = this.state;
        const classes = `layer ${this.state.className}`;

        return (
            <div
            className={classes}
            style={{backgroundImage: `url(${bgImg})`}}>{this.props.children}</div>
        );
    }
}