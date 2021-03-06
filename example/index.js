import React from "react";
import ReactDom from "react-dom";
import List from "./components/list";
import ReactPullToRefresh from "../src/index";

const defaultData = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [...defaultData],
      ptrDisabled: true
    };
  }

  componentDidMount() {
    console.log("component mounted");
    setTimeout(() => {
      this.setState({ ptrDisabled: false });
    }, 2000);
  }

  onRefresh() {
    console.log("onRefresh called");
  }

  render() {
    return (
      <ReactPullToRefresh
        disabled={this.state.ptrDisabled}
        onRefresh={this.onRefresh}
      >
        <h1 style={{ textAlign: "center" }}>Pull down to refresh</h1>
        <List data={this.state.data} />
      </ReactPullToRefresh>
    );
  }
}

ReactDom.render(<App />, document.querySelector("#app"));
