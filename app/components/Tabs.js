import React, { Component, PropTypes } from 'react';
import styles from './Tabs.css';
import classNames from 'classnames';
import Services from '../utils/services';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TalkyActions from '../actions/talky';

class Tabs extends Component {
    static propTypes = {
        services: PropTypes.array.isRequired,
        selectService: PropTypes.func.isRequired,
        selected: PropTypes.string.isRequired,
    };

    render() {
    	const {selected, selectService, services} = this.props;
    	
        return (
        	<ul className={styles.tabs}>
                <li key='talky'
                    className={classNames(styles.tab, selected == 'talky' ? styles.active : null)}>
                  <a onClick={()=>selectService('talky')}>
                    <div className={styles.talkyIcon}>
                      <img width="24" src={Services.talky().icon}/>
                    </div>
                    &nbsp;
                  </a>
                </li>
	        	{services.map(function(s) {
		    		return (
		        		<li key={'tab_' + s.id }
		                	className={classNames(styles.tab, selected == s.id ? styles.active : null)}>
		                <a onClick = {() => selectService(s.id)}>
		                <div className={styles.icon}>
		                	<img width="24"
		                		src={Services.service(s.type).icon} />
		                </div>
                        {s.title}
                        <span style={{display:s.count>0?null:'none'}} className={styles.badge}>{s.count}</span></a></li>
		            );
		    	})}
        	</ul>
        );
    }
}

function mapStateToProps(state) {
  return {
    selected: state.talky.selected,
    services: state.talky.services,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TalkyActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
