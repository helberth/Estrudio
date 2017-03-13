import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap';

export default class DeleteItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const { deleteItem } = this.props;

    return <div>
      <Button type="submit" bsStyle="danger" onClick={deleteItem}>Eliminar</Button>
    </div>
  }
};

DeleteItemForm.propTypes = {
  deleteItem: PropTypes.func.isRequired
}