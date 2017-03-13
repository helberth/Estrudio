import React, { Component } from 'react';
import { Grid, Row, Col, Jumbotron, Button } from 'react-bootstrap';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

import HeaderContainer from '../containers/HeaderContainer';
import CreateSubcategoryContainer from '../containers/CreateSubcategoryContainer';
import DeleteSubcategoryContainer from '../containers/DeleteSubcategoryContainer';
import { getSubcategoryByID } from '../reducers/subcategory-reducer';

class SubcategoryPage extends Component {

  constructor(props, context) {
    super(props, context)
  }

  getStore() {
    return this.context.store;
  }

  render() {

    const { params } = this.props;
    const { subcategoryID } = params;
    const state = this.context.store.getState();

    const subcategory = getSubcategoryByID(state, subcategoryID);
    const title = subcategory.getLabel();
    const categoryID = subcategory.getCategory();

    return <div>
      <HeaderContainer/>
      <Grid>
        <Row >
          <Col xs={10} xsOffset={1} sm={10} smOffset={1} md={8} mdOffset={2}>

            <Jumbotron className="well">
              <h3>Subcategoria {title}</h3>
              <p>- Estas son tus preguntas...</p>
              <DeleteSubcategoryContainer categoryID={categoryID} subcategoryID={subcategoryID} />
            </Jumbotron>

            <Row >
              <Col xs={12} sm={6} md={6} >
                <Panel collapsible defaultExpanded header="Preguntas" bsStyle="primary">
                  <p>Estas son tus preguntas....</p>
                  {/*
                  <SubcategoryListContainer subcategoryID = { subcategoryID } />
                  <CreateSubcategoryContainer subcategoryID = { subcategoryID } />
                  */}
                </Panel>
              </Col>
            </Row>

          </Col>
        </Row>
      </Grid>

    </div>
  }
};

SubcategoryPage.contextTypes = {
  //router: React.PropTypes.object.isRequired,
  store: React.PropTypes.object
}

export default SubcategoryPage;