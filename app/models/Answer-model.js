import Immutable from 'immutable';
const { Map, List, fromJS, Record } = Immutable

const AnswerRecord = new Record({
  id: undefined,
  title: ''
});

class Answer extends AnswerRecord {

  getID() {
    return this.get('id');
  }

  getLabel() {
    return this.get('title') || 'New TestType';
  }

}

export default Answer;