import React, { Component } from 'react';
import { Grid, Row, Col, Jumbotron, Button, Panel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import HeaderContainer from '../containers/HeaderContainer';
import { QuestionTypeListContainer } from '../containers/ListQuestiontype-container';


class Home extends Component {
  render() {
    return <div>
      <HeaderContainer />
      <Grid>
        <Row >
          <Col xs={10} xsOffset={1} sm={10} smOffset={1} md={8} mdOffset={2}>
            <Jumbotron className="well">
              <h1>You are the Admin of Estrudio</h1>
              <p>- Welcome master...</p>
            </Jumbotron>
            <Row >
              <Col xs={12} sm={6} md={6} >
                <Panel collapsible defaultExpanded header="Tipos de Preguntas" bsStyle="primary">
                  <p>Questions Types....</p>
                  <QuestionTypeListContainer />
                  <LinkContainer to="/createquestiontype">
                    <Button bsStyle="primary">Create Question Type</Button>
                  </LinkContainer>
                </Panel>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    </div>
  }
};

export default Home;