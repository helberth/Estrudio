import React, { Component } from 'react';
import { Grid, Row, Col, Jumbotron, Button } from 'react-bootstrap';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import HeaderContainer from '../containers/HeaderContainer';
import { ListQuizContainer } from '../containers/ListQuiz-container';
import ListSubcategoryContainer from '../containers/ListSubcategory-container';
import CreateQuizContainer from '../containers/CreateQuizContainer';
import DeleteCategoryContainer from '../containers/DeleteCategoryContainer';
import { getCategoryTitleByID } from '../reducers/category-reducer';

import actions from '../actions';
const { getQuizzesByCat, getAllQuizzes } = actions.quizActions;

class CategoryPage extends Component {

  constructor(props, context) {
    super(props, context)
    const { params } = this.props;
    const { categoryID } = params;
  }

  render() {

    const { params } = this.props;
    const { categoryID } = params;
    const state = this.context.store.getState();
    const title = getCategoryTitleByID(state, categoryID);

    return <div>
      <HeaderContainer />
      <Grid>
        <Row >
          <Col xs={10} xsOffset={1} sm={10} smOffset={1} md={8} mdOffset={2}>
            <Jumbotron className="well">
              <h3>Categoria {title}</h3>
              <p>- Estas son tus quices...</p>
              <DeleteCategoryContainer categoryID={categoryID} />
            </Jumbotron>
            <Row >
              <Col xs={12} sm={6} md={6} >
                <Panel collapsible defaultExpanded header="Quices" bsStyle="primary">
                  <p>Estas son tus quices....</p>
                  <ListQuizContainer categoryID={categoryID} />
                  <CreateQuizContainer categoryID={categoryID} />
                </Panel>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    </div>
  }
};

CategoryPage.contextTypes = {
  //router: React.PropTypes.object.isRequired,
  store: React.PropTypes.object
}

export default CategoryPage;