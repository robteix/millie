import React, { Component, PropTypes } from 'react';
import styles from './Tabs.css';
import classNames from 'classnames';
import Services from '../utils/services';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as MillieActions from '../actions/millie';

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
                <li key='millie'
                    className={classNames(styles.tab, selected == 'millie' ? styles.active : null)}>
                  <a onClick={()=>selectService('millie')}>
                    <div className={styles.millieIcon}>
                      <img width="24" src={Services.millie().icon}/>
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
    selected: state.millie.selected,
    services: state.millie.services,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MillieActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
