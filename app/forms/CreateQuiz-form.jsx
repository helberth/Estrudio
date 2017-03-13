import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';
import { Button, Form, FormGroup, FormControl, InputGroup, HelpBlock, ControlLabel, Checkbox } from 'react-bootstrap';
import { Field, FieldArray, reduxForm } from 'redux-form'

import FieldFormComponent from '../components/FieldForm-component'
import FieldButtonComponent from '../components/FieldButton-component'
import FieldButtonIconComponent from '../components/FieldButtonIcon-component'
import FieldSelectComponent from '../components/FieldSelect-component'
import DropdownComponent from '../components/Dropdown-component'
import QuestionItemComponent from '../components/QuestionItem-component'

const formName = 'CreateQuizForm';

const validate = values => {
  const errors = {}

  if (!values.title) {
    errors.title = 'Required'
  } else if (values.title.length < 4) {
    errors.title = 'Must be 4 characters or more'
  }

  return errors
}

class CreateQuizForm extends React.Component {
  constructor(props) {
    super(props);
    this.populateAnswers = this.populateAnswers.bind(this);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  populateAnswers(key) {
    //mapStateToProps
    const { getQuestionType } = this.props;

    const currentQuestiontype = getQuestionType(key);
    const answers = currentQuestiontype.getOptions();

    let newValues = [];
    [...Array(answers)].map((x, i) => newValues.push({}));
    this.props.change('members', newValues);
  }

  render() {
    //redux-form propTypes
    const { handleSubmit, pristine, reset, submitting, change, } = this.props

    //redux-form selectors
    const { questiontypeValue } = this.props

    //mapStateToProps
    const { questiontypes } = this.props;

    const { title } = this.props;

    return (
      <div>
        <Form onSubmit={handleSubmit(this.props.addItem.bind(this))}>
          <InputGroup>
            <Field
              name="title"
              type="text"
              component={FieldFormComponent}
              placeholder={title ? title : 'Crear Quiz...'} />
            <InputGroup.Button>
              <FormGroup controlId="formControlsSubmit">
                <Button type="submit" disabled={submitting} bsStyle="primary">
                  {submitting ? <i /> : <i />} {title ? 'Update' : 'Create'}
                </Button>
              </FormGroup>
            </InputGroup.Button>
          </InputGroup>
          {title &&
            <Button
              disabled={submitting}
              bsStyle="danger"
              onClick={handleSubmit(this.props.deleteItem.bind(this))}
            >
              {"Delete Quiz"}
            </Button>
          }
        </Form>
      </div>
    );
  }
};

CreateQuizForm.propTypes = {
  //title: PropTypes.string.isRequired,
  addItem: PropTypes.func.isRequired,
  //deleteItem: PropTypes.func.isRequired
}

export default (reduxForm({
  form: formName,
  //using reducer method
  //enableReinitialize: true,
  //keepDirtyOnReinitialize: true,
  validate
})(CreateQuizForm));