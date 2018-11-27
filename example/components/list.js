import React, { Component } from "react";

class List extends Component {
  static defaultProps = {
    data: []
  };
  render() {
    return (
      <ul>
        {this.props.data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }
}

export default List;
