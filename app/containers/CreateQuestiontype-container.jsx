import React from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';

import actions from '../actions';
const { createQuestionType } = actions.questiontypeActions;
import CreateQuestionTypeForm from '../forms/CreateQuestiontype-form';

const formName = 'CreateQuestionTypeForm';

const validateAndAddQuestionType = (values, dispatch) => {

  return new Promise((resolve, reject) => {

    dispatch(createQuestionType(values.name, values.options, values.answers)).then(() => {
      console.log("created and updated questiontype successfully into container..");
      dispatch(reset(formName));
      resolve();//this is for redux-form itself
    }).catch(error => {
      console.log("error creating and update questiontype into container..");
      console.log(error);
      reject({ name: error.message, _error: error.message }); //this is for redux-form itself
    });
  });

};

function mapStateToProps(state) {
    //Inicialmente no existe categories en el store...
    return {
        title: "Tipo de Pregunta",
        initialValues: {
          answers: 1,
          options: 1
          }
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addItem: validateAndAddQuestionType
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestionTypeForm)