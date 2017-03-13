import Immutable from 'immutable'
import * as types from '../actions/action-types';

const { Map } = Immutable

const initialState = Map({
  answers: [{}, {}] 
})

export function getAnswers(state) {
  return state.formquiz.get('answers');
}

export default function formquiz(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_OPTIONS:
      const numOfItems = action.value;
      let values = [];
      [...Array(numOfItems)].map((x, i) => values.push({}) );
      return state.set('answers', values);
  }
  return state;
}