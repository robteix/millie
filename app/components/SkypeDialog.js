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

class SkypeDialog extends Component {
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
        this.setState({titleError: false});
        if (this.state.id === undefined) {
            this.props.addService('skype', this.state.title.trim());
        } else {
            let newService = this.state;
            newService.title = this.state.title.trim();
            this.props.updateService(newService);
        }
        return true;
    }

    _onChangeTitle(event) {
        this.setState({title: event.target.value});
    }

    _onDelete() {
        this.props.deleteService(this.state.id);
        this.props.closeServiceDialog();
    }

    render() {
    	const {deleteService, editingService,closeServiceDialog} = this.props;
    	const isNew = (typeof(editingService.id) !== 'string' || editingService.id.trim() === '');
        let title = 'Add Skype';
        if (!isNew) {
            title = 'Editing ' + editingService.title;
        }
        let deleteFunc = isNew ? null : () => this._onDelete();
        return (
        	<ServiceDialog title={title} onDelete={deleteFunc} onSubmit={() => this.validate()} onClose={() => closeServiceDialog()}>
                <div className={styles.fieldLine}>
                <label className={styles.fieldLabel}>Title</label>
                <div className={styles.input}>
                <input autoFocus type="text" value={this.state.title} 
                    onChange={event => this._onChangeTitle(event)} 
                    className={styles.titleInput}/>
                <label className={styles.error}>{this.state.titleError?'This field cannot be empty':' '}</label>
                </div></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SkypeDialog);
