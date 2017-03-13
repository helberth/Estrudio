import Immutable from 'immutable';
const {
    Map,
    List,
    fromJS,
    Record
} = Immutable
import Answer from '../models/Answer-model'

const QuestionRecord = new Record({
    id: undefined,
    title: '',
    options: new List(),
    answers: undefined, //new List(Answer),
    correct: undefined,
    questiontype: undefined
});

class Question extends QuestionRecord {

    getID() {
        return this.get('id');
    }

    getLabel() {
        return this.get('title');
    }

    getOptions() {
        return this.get('options');
    }

    getAnswers() {
        return this.get('answers');
    }

    getCorrect() {
        return this.get('correct');
    }

    getQuestiontype() {
        return this.get('questiontype');
    }

    getSize() {
        return 0;
    }

}

export default Question;