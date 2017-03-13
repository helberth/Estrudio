import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

import ListItemComponent  from '../components/ListItem-component'
//import { getVisibleQuestions } from '../reducers/question-reducer';
//import { getQuestionsLoading } from '../reducers/ui-reducer';
import selectors from '../selectors'
const { makeGetVisibleQuestions } = selectors.questionSelector


const makeMapStateToProps = () => {
    const getVisibleQuestions = makeGetVisibleQuestions();
    const mapStateToProps = (state, ownProps) => {
        const {quizID} = ownProps;
        return {
            categories: getVisibleQuestions(state, ownProps)
        };
    }
    return mapStateToProps
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const {onSelect} = ownProps;
    return {
        selectItem: (questionID) => {
            //console.log("selectItem " + questionID);
            //3. In then go to QuestionPage??
            //browserHistory.push('/category/' + questionID);
            //console.log("before call onSelect..");
            onSelect(questionID);
        },
    }
}

export const ListQuestionContainer = connect(makeMapStateToProps, mapDispatchToProps)(ListItemComponent);
