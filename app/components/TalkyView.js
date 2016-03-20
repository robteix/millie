import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './TalkyView.css';
import classNames from 'classnames/bind';
import Services from '../utils/services.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TalkyActions from '../actions/talky';

let cx = classNames.bind(styles);

// ServiceView displays one of the available services
class TalkyView extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    services: PropTypes.array.isRequired,
  };

  render() {
    const { openServiceDialog, services, visible } = this.props;

    let className = cx('talkyView', {
      hide: !visible,
    });
    return (
      <div className={className}>
        <div className={styles.content} style={{display: services.length>0?null:'none'}}>
          <h1>Active Services</h1>
          {services.map(function(service) {
            return (
              <div key={service.id} onClick={() => openServiceDialog(service)} className={styles.activeService}>
                <img src={Services.service(service.type).icon}/>
                <label>{service.title}</label>
                <span style={{flexGrow: '1'}}></span>
                <i className='fa fa-edit'></i>
              </div>
            );
          })}
        </div>
        <div className={styles.content}>
          <h1>Add Service</h1>
          <div className={styles.addServiceContainer}>
          {Services.toArray().map(function(service) {
            return (
              <div key={service.id} className={styles.addService} onClick={() => openServiceDialog({type: service.id, title: service.title})}>
                <img src={service.icon}/>
                <label>{service.title}</label>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    services: state.talky.services,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(TalkyActions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(TalkyView);
