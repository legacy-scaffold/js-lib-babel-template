import React from "react";
import ReactDOM from "react-dom";
import { Button } from "antd";
import { test } from "../src";

class ComponentName extends React.Component {

  constructor (props) {
    super(props);
    this.state = {};
  };

  componentDidMount() {
    console.log(test);
  };

  render() {
    return (
      <Button>hello words</Button>)
  };
};


(function render() {
  const mountNode = document.createElement("div");
  document.body.appendChild(mountNode);
  ReactDOM.render((<ComponentName />), mountNode);
})();
