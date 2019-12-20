import React from "react";
import ReactDOM from "react-dom";

import { test } from "../src";

class ComponentName extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  };

  componentDidMount() {
    console.log(test);
  };

  render() {
    return (
      <div>hello words</div>)
  };
};


(function render() {
  const mountNode = document.createElement("div");
  document.body.appendChild(mountNode);
  ReactDOM.render((<ComponentName />), mountNode);
})();
