import React from 'react';
import {connect} from 'react-redux';
import {reset} from 'redux-form';

import actions from '../actions';
const { categoryActions } = actions;
const { createSubcategory, getSubcategoriesByCat } = categoryActions
import CreateItemForm from '../forms/CreateItem-form';

const formName = 'CategoryForm';
let _categoryID = '';

const validateAndAddCategory = (values, dispatch) => {
  //console.log("validateAndAddCategory ..");
  //console.log(values);

  return new Promise((resolve, reject) => {
    dispatch(createSubcategory(_categoryID, values.name)).then(() => {
      console.log("created and updated subcategory successfully into container..");
      dispatch(reset(formName));
      //dispatch(getSubcategoriesByCat(_categoryID));
      dispatch(getSubcategoriesByCat(_categoryID));
      resolve();//this is for redux-form itself
    }).catch(error => {
      console.log("error creating and update subcategory into container..");
      console.log(error);
      reject({ name: error.message, _error: error.message }); //this is for redux-form itself
    });
  });

};

function mapStateToProps(state) {
  return {
    title: "Subcategoria"
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const {categoryID} = ownProps;
  _categoryID = categoryID;

  return {
    addItem: validateAndAddCategory,
    editItem: () => {
      dispatch(editItem());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateItemForm)