import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './ServiceView.css';
import WebView from './WebView';

class SkypeView extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    onCounter: PropTypes.func.isRequired,
  };

  render() {
    const { id, onCounter } = this.props;
    var partition = "persist:skype_"+id;
    return (
    	<WebView id={partition} 
    		source="https://web.skype.com/"
    		partition={partition}
    		className={styles.serviceView} 
        onCounter={onCounter}/>
    );
  }
}

export default SkypeView;
