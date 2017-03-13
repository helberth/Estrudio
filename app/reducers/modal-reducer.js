import Immutable from 'immutable'
import * as types from '../actions/action-types';

const { Map } = Immutable

const initialState = Map({
  show:false,
  title:'',
  message:''
})

export function getShow(state) {
  return state.modal.get('show');
}

export function getTitle(state) {
  return state.modal.get('title');
}

export function getMessage(state) {
  return state.modal.get('message');
}

export default function modal(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_MODAL:
      return state.merge({
        show: true,
        title: action.title,
        message: action.message
      });
    case types.HIDE_MODAL:
      return state.merge({
        show:false,
        title: '',
        message:''
      });
  }
  return state;
}