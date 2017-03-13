import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Grid, Row, Col, Jumbotron, Button, Panel, Checkbox } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Modal from 'react-bootstrap/lib/Modal';

import FontAwesome from 'react-fontawesome';

import HeaderContainer from '../containers/HeaderContainer';
import CreateQuizContainer from '../containers/CreateQuizContainer';

class CreateQuiz extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {

    return (
      <div>
        <HeaderContainer />
        <Grid>
          <Row >
            <Col xs={10} xsOffset={1} sm={10} smOffset={1} md={8} mdOffset={2} >
              <Jumbotron className="well">
                <h3>Crear Quiz</h3>
                <p>Escoge el titulo del Quiz</p>
              </Jumbotron>
              <CreateQuizContainer />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
};

export default CreateQuiz;