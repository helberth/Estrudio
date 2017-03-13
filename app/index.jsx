import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from "react-hot-loader";

import configureStore from './store/configureStore';
import actions from './actions';
const { getAllCategories, getAllSubcategories } = actions.categoryActions;
const { getAllQuestionTypes } = actions.questiontypeActions;
const { getAllQuizzes } = actions.quizActions;
const { getAllQuestions } = actions.questionActions;
const { listenToAuth2, listenToAuth, logoutUser } = actions.authActions;
const { createUserInDB } = actions.userActions;
import Root from './containers/Root';

require('./main.css');

const store = configureStore();
const syncedHistory = syncHistoryWithStore(browserHistory, store);
const appElement = document.getElementById('app');

store.dispatch(listenToAuth(() => {
  const user = store.getState().auth.get('user');
  const userID = user.getUID();
  //console.log(user);
  store.dispatch(createUserInDB(user.toJS(), (role) => {
    console.log("Get the role of current user: " + role);
    switch (role) {
      case 'admin':
        console.log("WELCOME MASTER");
        browserHistory.push('/admin');
        store.dispatch(getAllCategories());
        store.dispatch(getAllQuestionTypes());
        break;
      case 'free_user':
      default:
        console.log("common user");
        browserHistory.push('/profile');
        store.dispatch(getAllCategories());
        store.dispatch(getAllQuestionTypes());
        break;
    }
  }));

}));


render(
  <AppContainer>
    <Root store={store} history={syncedHistory} />
  </AppContainer>,
  appElement
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    console.log("module hot accept..");
    const NextRoot = require('./containers/Root').default; // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={syncedHistory} />
      </AppContainer>, appElement
    );
  })
}
