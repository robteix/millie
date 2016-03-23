import React, { Component, PropTypes } from 'react';
import EventListener from './EventListener';
import keycode from 'keycode';
import styles from './ServiceDialog.css';
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

export default class ServiceDialog extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        onDelete: PropTypes.func,
        title: PropTypes.string.isRequired,
    };

    _onKeyUp(event) {
        if (keycode(event) === 'esc') {
            this.props.onClose();
        }
        if (keycode(event) === 'enter') {
            this.props.onSubmit();
            this.props.onClose();
        }
    }

    onSubmit() {
        if (this.props.onSubmit()) {
            this.props.onClose();
        }
    }

    render() {    	
        return (
        	<div id='dialog' className={styles.mainOverlay}>
                <EventListener elementName='dialog' onKeyUp={() => this._onKeyUp(event)}/>
                <div className={cx('dialogOverlay', 'narrow')}>
                    <div className={styles.dialog}>
                        <h1>{this.props.title}</h1>
                        <div className={styles.dialogContent}>
                            {this.props.children}
                        </div>
                        <div className={styles.dialogControls}>
                            <button onClick={() => this.props.onDelete()} style={{display:this.props.onDelete?null:'none'}} className={styles.delete}>Delete</button>
                            <span style={{width: '100%'}} />
                            <button onClick={() => this.props.onClose()}>Close</button>
                            <button className={styles.primary} onClick={() => this.onSubmit()}>Save</button>
                        </div>
                    </div>
                </div>
                <div className={styles.modalOverlay}></div>
            </div>
        );
    }
}
