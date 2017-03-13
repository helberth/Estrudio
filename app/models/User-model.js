import Immutable from 'immutable';
const { Map, List, fromJS, Record } = Immutable

const UserRecord = new Record({
  uid: undefined,
  email: '',
  name: '',
  providerId: '',
  role: ''
});

class User extends UserRecord {

  getUID() {
    return this.get('uid');
  }

  getEmail() {
    return this.get('email');
  }

  getName() {
    return this.get('name');
  }

  getProviderId() {
    return this.get('providerId');
  }

  getRole() {
    return this.get('role');
  }

  isAdmin() {
    return this.get('role') == 'admin'
  }

}

export default User;