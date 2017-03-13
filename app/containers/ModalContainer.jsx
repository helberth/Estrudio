import React from 'react';
import {connect} from 'react-redux';

import actions from '../actions'
const { hideModal } = actions.modalActions
import { getShow, getMessage, getTitle } from '../reducers/modal-reducer';
import ModalComponent from '../components/Modal-component';

function mapStateToProps(state) {
    const show = getShow(state);
    let message = '';
    let title = '';
    
    if (show) {
        title = getTitle(state);
        message = getMessage(state);
    } 

    return {
        show: show,
        title: title,
        message: message,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleHide: () => {
            dispatch(hideModal());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);