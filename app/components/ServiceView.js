import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './ServiceView.css';
import classNames from 'classnames/bind';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TalkyActions from '../actions/talky';

import MessengerView from './MessengerView.js';
import SkypeView from './SkypeView.js';
import TalkyView from './TalkyView.js';
import TelegramView from './TelegramView.js';

let cx = classNames.bind(styles);

// ServiceView displays one of the available services
class ServiceView extends Component {
  static propTypes = {
  	type: PropTypes.oneOf(['messenger', 'skype', 'talky', 'telegram']).isRequired,
    id: PropTypes.string.isRequired,
    visible: PropTypes.bool,
    onCounter: PropTypes.func,
  };

  render() {
    const { id, onCounter, type, visible, setCounter } = this.props;

    const services = {
      'messenger': MessengerView,
    	'skype': SkypeView,
      'telegram': TelegramView,
    	'talky': TalkyView,
    };

    var SView = services[type];

    let className = cx('serviceView', {
      hide: !visible,
    });
    return (
      <div className={className}>
    	 <SView id={id} onCounter={(c)=>setCounter(id, c)}></SView>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(TalkyActions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ServiceView);
