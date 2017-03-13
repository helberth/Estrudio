import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

import actions from '../actions';
const { addSubCategory, editItem, addSubItemtoItem } = actions.categoryActions;
import ListItemComponent  from '../components/ListItem-component'
import selectors from '../selectors'
const { makeGetVisibleQuizzes } = selectors.categorySelector

const makeMapStateToProps = () => {
    const getVisibleSubcategories = makeGetVisibleQuizzes()
    const mapStateToProps = (state, ownProps) => {
        const {categoryID} = ownProps;
        return {
            categories: getVisibleSubcategories(state, ownProps)
        };
    }
    return mapStateToProps
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        selectItem: (subcategoryID) => {
            //console.log("selectItem " + subcategoryID);
            //3. In then go to CatPage
            browserHistory.push('/subcategory/' + subcategoryID);
        },
    }
}

export default connect(makeMapStateToProps, mapDispatchToProps)(ListItemComponent);
