import React, { Component } from 'react';
import { Grid, Row, Col, Jumbotron, Button, Panel } from 'react-bootstrap';

import HeaderContainer from '../containers/HeaderContainer';
import CreateQuestionTypeContainer from '../containers/CreateQuestiontype-container';



class CreateQuestiontype extends Component {
  render() {
    return (
      <div>
        <HeaderContainer/>
        <Grid>
          <Row >
            <Col xs={10} xsOffset={1} sm={10} smOffset={1} md={8} mdOffset={2}>

              <Jumbotron className="well">
                <h3>Crear Tipo de Pregunta</h3>
                <p>- Escoja el tipo de Pregunta...</p>
              </Jumbotron>
              
              <CreateQuestionTypeContainer />

            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
};

export default CreateQuestiontype;