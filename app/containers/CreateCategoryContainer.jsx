import React from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';

import actions from '../actions';
const { createCategory } = actions.categoryActions;
import CreateItemForm from '../forms/CreateItem-form';

const formName = 'CategoryForm';

const validateAndAddCategory = (values, dispatch) => {
  console.log("validateAndAddCategory ..");
  console.log(values);

  return new Promise((resolve, reject) => {

    dispatch(createCategory(values.name)).then(() => {
      console.log("created and updated category successfully into container..");
      dispatch(reset(formName));
      resolve();//this is for redux-form itself
    }).catch(error => {
      console.log("error creating and update category into container..");
      console.log(error);
      reject({ name: error.message, _error: error.message }); //this is for redux-form itself
    });
  });

};

function mapStateToProps(state) {
  //Inicialmente no existe categories en el store...
  return {
    title: "Categoria"
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addItem: validateAndAddCategory
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateItemForm)
