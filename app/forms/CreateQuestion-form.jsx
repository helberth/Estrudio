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
import QuestionSelectComponent from '../components/QuestionSelect-component'
import QuestionSortingComponent from '../components/QuestionSorting-component'

const formName = 'CreateQuestionForm';
let questionTypeLabel = '';

const validate = values => {
  const errors = {}

  if (!values.title) {
    errors.title = 'Required'
  } else if (values.title.length < 4) {
    errors.title = 'Must be 4 characters or more'
  }

  if (!values.questiontype) {
    errors.questiontype = 'Required'
  }

  if (!values.options || values.options.length == 0) {
    errors.options = { _error: 'Debe crear al menos una opción' }
  }

  return errors
}


class CreateQuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.populateOptions = this.populateOptions.bind(this);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  populateOptions(key) {
    const { getQuestionType, questionID } = this.props;

    if (questionID == null) {
      const currentQuestiontype = getQuestionType(key);
      const optionsNumber = currentQuestiontype.getOptionsNumber();
      questionTypeLabel = currentQuestiontype.getLabel();
      let newValues = [];
      [...Array(optionsNumber)].map((x, i) => newValues.push({}));
      this.props.blur('options', newValues); 
    }


  }

  render() {
    //redux-form propTypes
    const { handleSubmit, pristine, reset, submitting, change, initialValues, blur } = this.props

    let isNewQuestion = true;


    if (initialValues) {
      isNewQuestion = false;
      questionTypeLabel = initialValues.questiontype;
    }


    //mapStateToProps
    const { questiontypes } = this.props;

    //from parent
    const { close } = this.props;


    return (
      <div>
        <Form onSubmit={handleSubmit(this.props.addItem.bind(this))}>
          <InputGroup>
            {isNewQuestion &&
              <Field
                name="questiontype"
                component={DropdownComponent}
                title='Question type'
                items={questiontypes}
                changeValue={change}
                selectedLabel={questionTypeLabel}
                onSelectItem={this.populateOptions}
              />
            }
            <InputGroup.Button>
              <FormGroup controlId="formControlsSubmit" >
                <Button type="submit" disabled={submitting} bsStyle="primary" >
                  {submitting ? <i /> : <i />}
                  {isNewQuestion ? "Createº" : "Save"}
                </Button>
                {!isNewQuestion &&
                  <Button
                    disabled={submitting}
                    bsStyle="danger"
                    onClick={handleSubmit(this.props.deleteItem.bind(this))}
                  >
                    {"Delete Question"}
                  </Button>
                }
              </FormGroup>
            </InputGroup.Button>

            {close &&
              <InputGroup.Button>
                <FormGroup controlId="formControlsCancel">
                  {isNewQuestion &&
                    <Button type="button" disabled={submitting} bsStyle="default" onClick={close} >
                      {submitting ? <i /> : <i />}Cancelar
                  </Button>}
                </FormGroup>
              </InputGroup.Button>
            }
          </InputGroup>

          {//questiontypeValue &&
            <Field
              name="title"
              type="text"
              component={FieldFormComponent}
              placeholder={'Pregunta'} />
          }

          {//questiontypeValue &&
            <div>
              <ControlLabel>{'Opciones '}</ControlLabel>
              <FieldArray
                name="options"
                component={questionTypeLabel == 'Sorting' ? QuestionSortingComponent : QuestionSelectComponent}
                initialValues={initialValues}
                blurValue={blur}
              />
            </div>}

        </Form>
      </div>
    );
  }
};

CreateQuestionForm.propTypes = {
  title: PropTypes.string.isRequired,
  addItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired
}

export default (reduxForm({
  form: formName,
  validate
})(CreateQuestionForm));