import React from 'react';

export class Menu extends React.Component {

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
    return (
      <menu
      className={this.state.active ? "menu menu-displayed" : "menu"}
      >
        <div>
        <a href="" className="corners-hover">home</a>
        <a href="" className="corners-hover">about</a>
        <a href="" className="corners-hover">members</a>
        <a href="" className="corners-hover">contact</a>
        </div>
      </menu>
    );
  }
}
