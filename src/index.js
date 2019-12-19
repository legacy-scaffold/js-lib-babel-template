import React from "react";
import ReactDOM from "react-dom";


class ComponentName extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
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
