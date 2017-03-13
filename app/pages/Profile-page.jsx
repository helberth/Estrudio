import React, { Component } from 'react';
import { Grid, Row, Col, Jumbotron, Button, Panel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import HeaderContainer from '../containers/HeaderContainer';
import {ListCategoryContainer} from '../containers/ListCategory-container';
import {ListQuizContainer} from '../containers/ListQuiz-container';
import CreateCategoryContainer from '../containers/CreateCategoryContainer';


class Profile extends Component {
  render() {
    return (
      <div>
        <HeaderContainer/>
        <Grid>
          <Row >
            <Col xs={10} xsOffset={1} sm={10} smOffset={1} md={8} mdOffset={2}>
              <Jumbotron className="well">
                <h1>Your Profile in Estrudio</h1>
                <p>- These are your questions...</p>
              </Jumbotron>
              <Row >
                <Col xs={12} sm={6} md={6} >
                  <Panel collapsible defaultExpanded header="Categorias" bsStyle="primary">
                    <p>These is your categories....</p>
                    <ListCategoryContainer />
                    <CreateCategoryContainer />
                  </Panel>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
};

export default Profile;