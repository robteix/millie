import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './ServiceView.css';
import classNames from 'classnames/bind';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TalkyActions from '../actions/talky';

import HangoutsView from './HangoutsView.js';
import MessengerView from './MessengerView.js';
import SkypeView from './SkypeView.js';
import SlackView from './SlackView.js';
import TalkyView from './TalkyView.js';
import TelegramView from './TelegramView.js';
import WhatsAppView from './WhatsAppView.js';

let cx = classNames.bind(styles);

// ServiceView displays one of the available services
class ServiceView extends Component {
  static propTypes = {
    service: PropTypes.object.isRequired,
    visible: PropTypes.bool,
  };

  render() {
    const { service, setCounter, visible } = this.props;

    const services = {
      'hangouts': HangoutsView,
      'messenger': MessengerView,
      'skype': SkypeView,
      'slack': SlackView,
      'telegram': TelegramView,
    	'talky': TalkyView,
      'whatsapp': WhatsAppView,
    };

    var SView = services[service.type];
    if (SView === undefined) return null;

    let className = cx('serviceView', {
      hide: !visible,
    });
    return (
      <div className={className}>
        <SView service={service} onCounter={(c) => setCounter(service.id, c)} />
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
