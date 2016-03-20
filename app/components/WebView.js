import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

export default class WebView extends Component {
  isSourceSet = false;
  static propTypes = {
    autosize: React.PropTypes.bool,
    disablewebsecurity: React.PropTypes.bool,
    httpreferrer: React.PropTypes.string,
    nodeintegration: React.PropTypes.bool,
    plugins: React.PropTypes.bool,
    preload: React.PropTypes.string,
    source: React.PropTypes.string.isRequired,
    useragent: React.PropTypes.string,
    partition: React.PropTypes.string.isRequired,
    onCount: React.PropTypes.func,
  };
  
  componentDidMount() {
    const node = findDOMNode(this);
    this.setUpListeners(node);
  }

  render() {
    return (
      <webview {...this.props}
        ref={node => {
          if (node) {
            node.setAttribute('partition', this.props.partition);
            if (!this.isSourceSet) {
              node.setAttribute('src', this.props.source);
              this.isSourceSet = true;
            }
          }
        }} />
    );
  }

  _onCount(event) {
    if (this.props.onCounter) {
      let count = event.args[0];
      this.props.onCounter(count);
    }
  }

  setUpListeners(node) {
    /*node.addEventListener('console-message', (a) => {
      console.log(a)
    });*/
    node.addEventListener('ipc-message', (event) => {
      if (event.channel === 'message-count') this._onCount(event);
    })
  }
}