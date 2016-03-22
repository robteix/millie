import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './ServiceView.css';
import WebView from './WebView';

class SlackView extends Component {
  static propTypes = {
    service: PropTypes.object.isRequired,
    onCounter: PropTypes.func.isRequired,
  };

  render() {
    const { onCounter, service } = this.props;
    var partition = "persist:slack_"+service.id;
    return (
        <WebView id={partition} 
          source={'https://'+service.team+'.slack.com/'}
          preload='./utils/counters/slack.js' 
          partition={partition} 
          className={styles.serviceView}
          onCounter={onCounter} />
    		
    );
  }
}

export default SlackView;
