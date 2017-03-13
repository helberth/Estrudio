import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class FieldFormComponent extends Component {

  getValidateMessage(touched, error) {
    let message = null;

    if (touched) {
      switch (error) {
        case 'Required':
          message = 'warning';
          break;
        case undefined:
          message = "success";
          break;
        default:
          message = "error";
          break;
      }
    }

    return message;
  }

  componentDidMount() {
    const { input, initialValues, blurValue } = this.props;
    if (initialValues) {
      blurValue(input.name, initialValues);
    }
  }

  render() {
    const { input, placeholder, type, meta: { touched, error } } = this.props;

    return (
      <FormGroup controlId={input.name}
        validationState={this.getValidateMessage(touched, error)}
        >
        <ControlLabel>{this.props.children}</ControlLabel>
        <FormControl
          type={type}
          placeholder={placeholder}
          {...input}
          />
        <FormControl.Feedback />
        {touched && error && <HelpBlock>{error}</HelpBlock>}
      </FormGroup>

    );
  }
}