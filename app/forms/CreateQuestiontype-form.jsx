import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';
import { Button, ButtonGroup, Form, FormGroup, FormControl, InputGroup, HelpBlock } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form'

import FieldFormComponent from '../components/FieldForm-component'
import FieldButtonComponent from '../components/FieldButton-component'

import NumericStepperComponent from '../components/NumericStepper-component'

const formName = 'CreateQuestionTypeForm';

const validate = values => {
  const errors = {}

  if (!values.name) {
    errors.name = 'Required'
  } else if (values.name.length < 4) {
    errors.name = 'Must be 4 characters or more'
  }

  if (!values.answers) {
    errors.answers = 'Required'
  } else if (values.answers <= 0) {
    errors.answers = 'Must be greater than 0'
  }

  if (!values.options) {
    errors.options = 'Required'
  } else if (values.options <= 0) {
    errors.options = 'Must be greater than 0'
  }

  return errors
}

class CreateQuestionTypeForm extends React.Component {
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
    const { handleSubmit, pristine, reset, submitting, blur } = this.props

    //mapStateToProps
    const { title } = this.props;

    return <div>
      <Form onSubmit={handleSubmit(this.props.addItem.bind(this))}>
        <InputGroup>
          <Field
            name="name"
            type="text"
            component={FieldFormComponent}
            placeholder={"title..."}>
            Titulo
          </Field>
          <InputGroup.Button>
            <Field
              name="submit"
              type="submit"
              component={FieldButtonComponent}
              placeholder={"Create"}
              submitting={submitting}
              style={"primary"}
              />
          </InputGroup.Button>
        </InputGroup>

        <Field
          name="options"
          component={NumericStepperComponent}
          placeholder={"Options number..."}
          style={"success"}
          blurValue={blur}
          min={1}
          max={4}
          step={1} >
          Options number
          </Field>

        <Field
          name="answers"
          component={NumericStepperComponent}
          placeholder={"Answers number..."}
          style={"success"}
          blurValue={blur}
          min={1}
          max={4}
          step={1} >
          Answers number
          </Field>
      </Form>
    </div>
  }
};

CreateQuestionTypeForm.propTypes = {
  title: PropTypes.string.isRequired,
  addItem: PropTypes.func.isRequired
}

export default (reduxForm({
  form: formName,
  validate
})(CreateQuestionTypeForm));
