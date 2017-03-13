import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Grid, Row, Col, Jumbotron, Button, Panel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Modal from 'react-bootstrap/lib/Modal';

import HeaderContainer from '../containers/HeaderContainer';
import UpdateQuizContainer from '../containers/UpdateQuizContainer';
import CreateQuestionContainer from '../containers/CreateQuestionContainer';
import { ListQuestionContainer } from '../containers/ListQuestion-container';
import { getQuizByID } from '../reducers/quiz-reducer';

import ConfigQuizComponent from '../components/ConfigQuiz-component'
import ModalComponent from '../components/Modal-component'


class QuizPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showCreateQuestion: false,
      isPanelOpen: true,
      currentQuestion: undefined
    };

    this.openQuestion = this.openQuestion.bind(this);
    this.openCreateQuestion = this.openCreateQuestion.bind(this);
    this.closeCreateQuestion = this.closeCreateQuestion.bind(this);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  openQuestion(questionID) {
    console.log("openQuestion called. questionID: " + questionID);

    if (questionID) {
      this.setState({ currentQuestion: questionID });
    }

    this.setState({ showCreateQuestion: true });
  }

  openCreateQuestion() {
    this.setState({ currentQuestion: undefined });
    this.setState({ showCreateQuestion: true });
  }

  closeCreateQuestion() {
    this.setState({ showCreateQuestion: false });
  }

  render() {

    const {params} = this.props;
    const {quizID} = params;
    console.log("QuizPage render. params");
    console.log(params);
    const state = this.context.store.getState();
    const quiz = getQuizByID(state, quizID);
    const title = quiz.getLabel();

    return (
      <div>
        <HeaderContainer />
        <Grid>
          <Row >
            <Col xs={10} xsOffset={1} sm={10} smOffset={1} md={8} mdOffset={2} >

              <Jumbotron className="well">
                <h3>Quiz: {title}</h3>
              </Jumbotron>

              <Row>
                <Col xs={12} sm={6} md={6} >
                  <Panel>
                    <UpdateQuizContainer quizID={quizID} title={title} />
                    <ConfigQuizComponent title='Configuración' />
                  </Panel>
                </Col>

                <Col xs={12} sm={6} md={6} >
                  <Panel
                    collapsible
                    defaultExpanded
                    header={this.state.isPanelOpen ? "Preguntas" : "Ver preguntas"}
                    bsStyle="default"
                    onEntered={() => this.setState({ isPanelOpen: true })}
                    onExited={() => this.setState({ isPanelOpen: false })}
                  >
                    <ListQuestionContainer
                      quizID={quizID}
                      title="Preguntas"
                      onSelect={this.openQuestion} />
                    <Button
                      bsStyle="primary"
                      onClick={this.openCreateQuestion}
                    > Agregar Pregunta
                    </Button>
                  </Panel>
                </Col>
              </Row>

              <ModalComponent
                title={this.state.currentQuestion == null ? "Nueva Pregunta" : "Pregunta: "}
                message={
                  <CreateQuestionContainer
                    quizID={quizID}
                    close={this.closeCreateQuestion}
                    questionID={this.state.currentQuestion}
                  />
                }
                show={this.state.showCreateQuestion}
                handleHide={this.closeCreateQuestion}
                size={"large"}
                noautohide={true} />

            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
};

QuizPage.contextTypes = {
  //router: React.PropTypes.object.isRequired,
  store: React.PropTypes.object
}

export default QuizPage;