import Immutable from 'immutable';
const { Map, List, fromJS, Record } = Immutable

const SubcategoryRecord = new Record({
  id: undefined,
  title: '',
  category: undefined
});

class Subcategory extends SubcategoryRecord {

  getID() {
    return this.get('id');
  }
    
  getLabel() {
    return this.get('title') || 'New Subcategory';
  }

  getCategory() {
    return this.get('category');
  }

  getSize() {
    return 0;
  }
}

export default Subcategory;