import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

import ListItemComponent  from '../components/ListItem-component'
import { getVisibleCategories } from '../reducers/category-reducer';
import { getCategoriesLoading } from '../reducers/ui-reducer';

import actions from '../actions';
const { getQuizzesByCat, clearQuizzes } = actions.quizActions;

function mapStateToProps(state) {
    return {
        categories: getVisibleCategories(state),
        isLoading: getCategoriesLoading(state)
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        selectItem: (categoryID) => {
            //console.log("selectItem " + categoryID);
            //1. clear quizzes store
            dispatch(clearQuizzes());
            //2. call getQuizzesByCat action
            dispatch(getQuizzesByCat(categoryID));
            //3. In then go to CatPage
            browserHistory.push('/category/' + categoryID);
        },
    }
}

export const ListCategoryContainer = connect(mapStateToProps, mapDispatchToProps)(ListItemComponent);
