import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

export default class WebView extends Component {
  isSourceSet = false;
  webView = null;
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
    openDevTools: React.PropTypes.bool,
  };
  
  componentDidMount() {
    const node = findDOMNode(this);
    //node.addEventListener('console-message', this._onConsoleMessage);
    node.addEventListener('ipc-message', this._onIpcMessage.bind(this));
    node.addEventListener('new-window', this._onNewWindow);
    node.addEventListener("dom-ready", this._onDomReady.bind(this));
  }

  componentDidUnmout() {
    const node = findDOMNode(this);
    //node.removeEventListener('console-message', this._onConsoleMessage);
    node.removeEventListener('ipc-message', this._onIpcMessage.bind(this));
    node.removeEventListener('new-window', this._onNewWindow);
    node.removeEventListener('dom-ready', this._onDomReady.bind(this));
  }

  render() {
    const { partition, source, onCounter, ...rest } = this.props; 
    return (
      <webview {...rest}
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

  _onDomReady(event) {
    if (this.props.openDevTools) {
      const node = findDOMNode(this);
      node.openDevTools();
    }
  }

  _onNewWindow(event) {
    require('electron').shell.openExternal(event.url);
  }

  _onConsoleMessage(event) {
    console.log('console-message', event.message);
  }

  _onIpcMessage(event) {
    if (event.channel === 'message-count') this._onCount(event);
  }
}
