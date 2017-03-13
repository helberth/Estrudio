import Immutable from 'immutable';
const { Map, List, fromJS, Record } = Immutable
import Question from '../models/Question-model'

const QuizRecord = new Record({
  id: undefined,
  title: '',
  questions: new List(),
  random: false
});

class Quiz extends QuizRecord {

  getID() {
    return this.get('id');
  }

  getLabel() {
    return this.get('title');
  }

  getQuestions() {
    return this.get('questions');
  }

  isRandom() {
    return this.get('random');
  }

  getSize() {
    return 0;
  }

}

export default Quiz;