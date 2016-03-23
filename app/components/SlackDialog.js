import React, { Component, PropTypes } from 'react';
import EventListener from 'react-event-listener';
import keycode from 'keycode';
import styles from './ServiceDialog.css';
import classNames from 'classnames/bind';
import {Services} from '../utils/services';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as MillieActions from '../actions/millie';
import ServiceDialog from './ServiceDialog';

let cx = classNames.bind(styles);

class SlackDialog extends Component {
    static propTypes = {
        editingService: PropTypes.object.isRequired,
        addService: PropTypes.func.isRequired,
        deleteService: PropTypes.func.isRequired,
        closeServiceDialog: PropTypes.func.isRequired,
    };
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.setState(Object.assign({}, this.props.editingService));
    }

    validate() {
        let re = /^[A-Za-z0-9\-]+$/;
        let titleError = (this.state.title.trim() === '');
        let teamError = !this.state.team.match(re);

        this.setState({titleError: titleError, teamError: teamError});
        if (titleError || teamError) return false;

        console.log('OK!');
        this.props.addService('slack', this.state.title.trim(), this.state.team);
        return true;
    }

    _onChangeTitle(event) {
        this.setState({title: event.target.value});
    }

    _onChangeTeam(event) {
        this.setState({team: event.target.value});
    }

    _onDelete() {
        this.props.deleteService(this.state.id);
        this.props.closeServiceDialog();
    }

    render() {
    	const {deleteService, editingService,closeServiceDialog} = this.props;
    	const isNew = (typeof(editingService.id) !== 'string' || editingService.id.trim() === '');
        let title = 'Add Slack';
        if (!isNew) {
            title = 'Editing ' + editingService.title;
        }
        let deleteFunc = isNew ? null : () => this._onDelete();
        return (
        	<ServiceDialog title={title} onDelete={deleteFunc} onSubmit={() => this.validate()} onClose={() => closeServiceDialog()}>
                <div className={styles.fieldLine}>
                    <label className={styles.slackFieldLabel}>Title</label>
                    <div className={styles.input}>
                        <input autoFocus type="text" value={this.state.title} 
                            onChange={event => this._onChangeTitle(event)} 
                            className={styles.titleInput}/>
                        <label className={styles.error}>{this.state.titleError?'This field cannot be empty':' '}</label>
                    </div>
                </div>
                <div className={styles.fieldLine}>
                    <label className={styles.slackFieldLabel}>Team</label>
                    <div className={styles.input}>
                        <div className={styles.inputWrapper}>
                            <p className={styles.urlOverlay}>{this.state.team}</p>
                            <input  type="text" value={this.state.team} 
                                onChange={event => this._onChangeTeam(event)} 
                                className={styles.titleInput}/>
                        </div>
                        <label className={styles.error}>
                            {this.state.teamError?'Invalid team name':' '}
                        </label>
                    </div>
                </div>
            </ServiceDialog>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(SlackDialog);
