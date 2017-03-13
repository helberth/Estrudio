import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';
import { Button, Form, FormGroup, FormControl, InputGroup, HelpBlock } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form'

import FieldFormComponent from '../components/FieldForm-component'
import FieldButtonComponent from '../components/FieldButton-component'

const formName = 'CategoryForm';

const validate = values => {
  const errors = {}

  if (!values.name) {
    errors.name = 'Required'
  } else if (values.name.length < 4) {
    errors.name = 'Must be 4 characters or more'
  }

  return errors
}

class CreateItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  handleSubmit(values) {
    console.log("handleSubmit..");
    console.log(values);
    const { reset } = this.props;
  }

  render() {
    //redux-form propTypes
    const { handleSubmit, pristine, reset, submitting } = this.props

    //mapStateToProps
    const { title } = this.props;

    return <div>
      <Form onSubmit={handleSubmit(this.props.addItem.bind(this))}>
        <InputGroup>
          <Field
            name="name"
            type="text"
            component={FieldFormComponent}
            placeholder={"Crear " + title + "..."}>
          </Field>
          <InputGroup.Button>
            <Field
              name="submit"
              type="submit"
              component={FieldButtonComponent}
              placeholder={"Crear"}
              submitting={submitting}
              style={"primary"}
            />
          </InputGroup.Button>
        </InputGroup>
      </Form>
    </div>
  }
};

CreateItemForm.propTypes = {
  title: PropTypes.string.isRequired,
  addItem: PropTypes.func.isRequired
}

export default (reduxForm({
  form: formName,
  validate
})(CreateItemForm));
