import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

import actions from '../actions';
const { deleteCategory } = actions.categoryActions;
import DeleteItemForm from '../forms/DeleteItem-form';


function mapStateToProps(state) {

  return {
    //title: "Categoria"
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { categoryID } = ownProps;
  return {
    deleteItem: () => {
      dispatch(deleteCategory(categoryID)).then(() => {
        console.log("remove category successfully into container..");
        browserHistory.push('/profile');
      }).catch(error => {
        console.log("error removing category into container..");
        console.log(error);
        //show modal
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteItemForm);