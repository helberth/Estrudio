import React, { Component } from 'react';
import { Grid, Row, Col, Jumbotron, Button } from 'react-bootstrap';

import HeaderContainer from '../containers/HeaderContainer';

class Home extends Component {
  render() {
    return <div> 
      <HeaderContainer/>
      <Grid>
        <Row >
          <Col xs={10} xsOffset={1} sm={10} smOffset={1} md={8} mdOffset={2}>
            <Jumbotron className="well">
              <h1>Estrudio</h1>
              <p>- Create quizzes of all you want.
                <br/>- Challenge your friends.
                <br/>- Have fun while you learn.</p>
              <p><Button bsStyle="primary">Start now!</Button></p>
            </Jumbotron>
          </Col>
        </Row>
      </Grid>
    </div>
  }
};

export default Home;