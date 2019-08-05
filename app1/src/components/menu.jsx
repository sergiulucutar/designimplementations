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
        <a href="">home</a>
        <a href="">about</a>
        <a href="">members</a>
        <a href="">contact</a>
        </div>
      </menu>
    );
  }
}
