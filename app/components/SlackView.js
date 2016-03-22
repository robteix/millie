import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './ServiceView.css';
import WebView from './WebView';

class SlackView extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    team: PropTypes.string.isRequired,
    onCounter: PropTypes.func.isRequired,
  };

  render() {
    const { id, onCounter, team } = this.props;
    var partition = "persist:slack_"+id;
    return (
        <WebView id={partition} 
          source={'https://'+team+'.slack.com/'}
          preload='./utils/counters/slack.js' 
          partition={partition} 
          className={styles.serviceView}
          onCounter={onCounter} />
    		
    );
  }
}

export default SlackView;
