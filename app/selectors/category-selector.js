import { createSelector } from 'reselect'
import Immutable from 'immutable'
import { List, Record, Map } from 'immutable';

const getQuizzesByCat = (state, props) => {
    const category = state.categories.get(props.categoryID);
    if (category)
        return category.get('quizzes');
}

const getAllQuizzes = (state, props) => state.quizzes;

export const makeGetVisibleQuizzes = () => {
    return createSelector(
        [getQuizzesByCat, getAllQuizzes],
        (quizzesByCat, allQuizzes) => {
            let list = new List();

            if (quizzesByCat) {
                quizzesByCat.map(id => {
                    const quiz = allQuizzes.get(id.toString());
                    if (quiz) list = list.push(quiz);
                });
            }
            return list;
        }
    )
}