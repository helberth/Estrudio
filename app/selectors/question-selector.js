import { createSelector } from 'reselect'
import Immutable from 'immutable'
import { List, Record, Map } from 'immutable';

const getQuestionsByQuiz = (state, props) => {
    //console.log("question-selector");
    //console.log("props.quizID: " + props.quizID);
    const quiz = state.quizzes.get(props.quizID);
    if (quiz){
        //console.log(quiz.toJS());
        return quiz.get('questions');
    }
        
}

const getAllQuestions = (state, props) => state.questions;

export const makeGetVisibleQuestions = () => {
    return createSelector(
        [getQuestionsByQuiz, getAllQuestions],
        (questionsByQuiz, allQuestions) => {
            let list = new List();

            if (questionsByQuiz) {
                questionsByQuiz.map(id => {
                    const question = allQuestions.get(id.toString());
                    if (question) list = list.push(question);
                });
            }
            return list;
        }
    )
}