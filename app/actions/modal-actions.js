import * as types from '../actions/action-types';

export const showModal = (title, message) => {
  return {
    type: types.SHOW_MODAL,
    title,
    message
  }
}

export const hideModal = () => {
  return {
    type: types.HIDE_MODAL
  }
}

