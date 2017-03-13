import React, { Component } from 'react';
import { Grid, Row, Col, Jumbotron, Button } from 'react-bootstrap';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

import HeaderContainer from '../containers/HeaderContainer';
import DeleteCategoryContainer from '../containers/DeleteCategoryContainer';
import { getQuestiontypeTitleByID, getQuestionTypeByID } from '../reducers/questiontype-reducer';

class QuestiontypePage extends Component {

  constructor(props, context) {
        super(props, context)
    }

    getStore () { 
      return this.context.store;
    }

  render() {

    const {params} = this.props;
    const {questiontypeID} = params;
    const state = this.context.store.getState();
    const questiontype = getQuestionTypeByID(state, questiontypeID);
    const title = questiontype.getLabel();
    const options = questiontype.getOptionsNumber();
    const answers = questiontype.getAnswers();

    return <div>
      <HeaderContainer/>
      <Grid>
        <Row >
          <Col xs={10} xsOffset={1} sm={10} smOffset={1} md={8} mdOffset={2}>
          
            <Jumbotron className="well">
              <h3>Tipo de Pregunta: {title}</h3>
              <p>- Opciones: {options}</p>
              <p>- Respuestas: {answers}</p>
              <DeleteCategoryContainer questiontypeID={questiontypeID} />
            </Jumbotron>
                 
          </Col>
        </Row>
      </Grid>

    </div>
  }
};

QuestiontypePage.contextTypes = {
    store: React.PropTypes.object
}

export default QuestiontypePage;