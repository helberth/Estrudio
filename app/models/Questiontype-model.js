import Immutable from 'immutable';
const { Map, List, fromJS, Record } = Immutable

const QuestionTypeRecord = new Record({
  id: undefined,
  title: '',
  options: 0,
  answers: 0
});

class QuestionType extends QuestionTypeRecord {

  getID() {
    return this.get('id');
  }

  getLabel() {
    return this.get('title');
  }

  getSize() {
    return 0;
  }

  getOptionsNumber() {
    return this.get('options');
  }

  getAnswers() {
    return this.get('answers');
  }

}

export default QuestionType;