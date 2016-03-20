import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import TalkyView from './TalkyView.js';
import ServiceView from './ServiceView.js';
//var classNames = require('classnames');
import classNames from 'classnames';
import AddServiceDialog from './AddServiceDialog';
import Tabs from './Tabs';
import Services from '../utils/services';
import * as UI from '../utils/ui';

export default class Home extends Component {
  static propTypes = {
    selectService: PropTypes.func.isRequired,
    selected: PropTypes.string,
    services: PropTypes.array.isRequired,
  };

  render() {
    const {
      addService,
      selected,
      selectService,
      services,
    } = this.props;
    
    UI.makeMenus(services, selectService);

    return (
      <div>
        <div className={styles.container}>
          
          <ul className={styles.tabs}>
            <li key='talky' className={classNames(styles.talky, styles.tab, selected=='talky'?styles.active:null)}>
              <a onClick={()=>selectService('talky')}>
                <div className={styles.icon}>
                  <img width="24" src={Services.talky().icon}/>
                </div>
                &nbsp;
              </a>
            </li>
            <Tabs services={services} selectService={selectService} />
          </ul>

          <div className={styles.serviceContainer}>
            <TalkyView visible={selected=='talky'} />
            {services.map(function(s) {
              return (
               <ServiceView key={'content_'+s.id} id={s.id} type={s.type} 
                            visible={selected==s.id}></ServiceView>
              );
            })}
          </div>
        </div>

        <AddServiceDialog />

      </div>
    );
  }
}
