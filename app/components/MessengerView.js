import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './ServiceView.css';
import WebView from './WebView';

class MessengerView extends Component {
  static propTypes = {
    service: PropTypes.object.isRequired,
    onCounter: PropTypes.func.isRequired,
  };

  render() {
    const { onCounter, service } = this.props;
    var partition = "persist:messenger_"+service.id;
    return (
        <WebView id={partition} 
          source="https://www.messenger.com/"
          preload='./utils/counters/messenger.js' 
          partition={partition} 
          className={styles.serviceView}
          onCounter={onCounter} />
    		
    );
  }
}

export default MessengerView;
