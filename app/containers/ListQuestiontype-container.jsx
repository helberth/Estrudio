import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

import ListItemComponent  from '../components/ListItem-component'
import { getVisibleQuestionTypes } from '../reducers/questiontype-reducer';
import { getQuestionTypeLoading } from '../reducers/ui-reducer';


//we have to map the state attributes to React props for the TodoApp component – 
//that is what gives us the TodoAppContainer.
function mapStateToProps(state) {
    return {
        categories: getVisibleQuestionTypes(state),
        isLoading: getQuestionTypeLoading(state)
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        selectItem: (questiontypeID) => {
            //console.log("selectItem " + questiontypeID);
            //3. In then go to QuestionTypePage
            browserHistory.push('/questiontype/' + questiontypeID);
        },
    }
}

export const QuestionTypeListContainer = connect(mapStateToProps, mapDispatchToProps)(ListItemComponent);
