import Immutable from 'immutable';
const { Map, List, fromJS, Record } = Immutable

const CategoryRecord = new Record({
  id: undefined,
  title: '',
  quizzes: new List()
});

class Category extends CategoryRecord {

  getID() {
    return this.get('id');
  }

  getQuizzes() {
    return this.get('quizzes');
  }

  getLabel() {
    return this.get('title') || 'New Category';
  }

  getSize() {
    return this.getQuizzes().size;
  }

}

export default Category;