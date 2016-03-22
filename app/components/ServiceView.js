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
  	type: PropTypes.oneOf(['hangouts', 'messenger', 'skype', 'talky', 'telegram', 'whatsapp']).isRequired,
    id: PropTypes.string.isRequired,
    team: PropTypes.string,
    visible: PropTypes.bool,
    onCounter: PropTypes.func,
  };

  render() {
    const { id, onCounter, type, team, visible, setCounter } = this.props;

    const services = {
      'hangouts': (<HangoutsView {...this.props} />),
      'messenger': <MessengerView {...this.props} />,
      'skype': <SkypeView {...this.props} />,
      'slack': <SlackView {...this.props} team={team} />,
      'telegram': <TelegramView {...this.props} />,
    	'talky': <TalkyView {...this.props} />,
      'whatsapp': <WhatsAppView {...this.props} />,
    };

    var SView = services[type];
    if (SView === undefined) return null;

    let className = cx('serviceView', {
      hide: !visible,
    });
    return (
      <div className={className}>
        {SView}
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
