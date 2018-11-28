# react-pulltorefresh

基于[pulltorefreshjs](https://github.com/BoxFactura/pulltorefresh.js/blob/master/README.md)的下拉刷新组件。
如果有问题， 可以提 issue 或者可以直接联系我 8452201776@qq.com ～谢谢。

## example

```javascript
import React from "react";
import ReactDom from "react-dom";
import List from "./components/list";
import ReactPullToRefresh from "../src/index";

const defaultData = ["one", "two", "three"];

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
```
