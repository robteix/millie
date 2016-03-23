import React, { Component, PropTypes } from 'react';
import styles from './ServiceView.css';

import HangoutsDialog from './HangoutsDialog';
import MessengerDialog from './MessengerDialog';
import TelegramDialog from './TelegramDialog';
import SkypeDialog from './SkypeDialog';
import SlackDialog from './SlackDialog';
import WhatsAppDialog from './WhatsAppDialog';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as MillieActions from '../actions/millie';

class AddServiceDialog extends Component {
  static propTypes = {
    editingService: PropTypes.object.isRequired,
  };

  render() {
    const { editingService } = this.props;
    switch (editingService.type) {
      case 'hangouts':
        return <HangoutsDialog />
      case 'messenger':
        return <MessengerDialog />
      case 'telegram':
        return <TelegramDialog />
      case 'skype':
        return <SkypeDialog />
      case 'slack':
        return <SlackDialog />
      case 'whatsapp':
        return <WhatsAppDialog />
    }
    return null;
  }
}

function mapStateToProps(state) {
  return {
    editingService: state.millie.editingService,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(MillieActions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AddServiceDialog);
