import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

import ListItemComponent from '../components/ListItem-component'
import { getVisibleQuizzes } from '../reducers/quiz-reducer';
import { getQuizzesLoading } from '../reducers/ui-reducer';
import selectors from '../selectors'
const { makeGetVisibleQuizzes } = selectors.categorySelector

import actions from '../actions';
const { getQuestionsByQuiz, clearQuestions } = actions.questionActions;

const makeMapStateToProps = () => {
    //const getVisibleQuizzes = makeGetVisibleQuizzes()

    const mapStateToProps = (state, ownProps) => {
        const { categoryID } = ownProps;
        //const visibleQuizzes = getVisibleQuizzes(state, ownProps);
        //console.log("visibleQuizzes:");
        //console.log(visibleQuizzes.toJS());
        return {
            //categories: getVisibleQuizzes(state, ownProps),//using selectors
            categories: state.quizzes.valueSeq(),//using state directly, when call getQuizzesbyCat
            //valueSeq is necessary to get a List from a Map
            isLoading: getQuizzesLoading(state)
        };
    }
    return mapStateToProps
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        selectItem: (quizID) => {
            //console.log("selectItem " + quizID);
            //1. clear questionActions
            dispatch(clearQuestions());
            //2. call getQuestionsByQuiz action
            dispatch(getQuestionsByQuiz(quizID));
            //3. In then go to QuizPage
            browserHistory.push('/quiz/' + quizID);
        },
    }
}

export const ListQuizContainer = connect(makeMapStateToProps, mapDispatchToProps)(ListItemComponent);
