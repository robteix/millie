import React, { Component, PropTypes } from 'react';
import styles from './ServiceView.css';

import MessengerDialog from './MessengerDialog';
import TelegramDialog from './TelegramDialog';
import WhatsAppDialog from './WhatsAppDialog';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TalkyActions from '../actions/talky';

class AddServiceDialog extends Component {
  static propTypes = {
    editingService: PropTypes.object.isRequired,
  };

  render() {
    const { editingService } = this.props;
    switch (editingService.type) {
      case 'messenger':
        return <MessengerDialog />
      case 'telegram':
        return <TelegramDialog />
      case 'whatsapp':
        return <WhatsAppDialog />
    }
    return null;
  }
}

function mapStateToProps(state) {
  return {
    editingService: state.talky.editingService,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(TalkyActions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AddServiceDialog);
