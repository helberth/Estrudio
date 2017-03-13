import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

import actions from '../actions';
const { deleteSubcategory } = actions.categoryActions;
import DeleteItemForm from '../forms/DeleteItem-form';


function mapStateToProps(state) {

  return {
    //title: "Categoria"
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { categoryID, subcategoryID } = ownProps;
  console.log("categoryID: " + categoryID + ", subcategoryID: " + subcategoryID);
  return {
    deleteItem: () => {
      dispatch(deleteSubcategory(categoryID, subcategoryID)).then(() => {
        console.log("remove subcategoryID successfully into container..");
        browserHistory.push('/category/' + categoryID);        
      }).catch(error => {
        console.log("error removing subcategoryID into container..");
        console.log(error);
        //show modal
      });

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteItemForm);