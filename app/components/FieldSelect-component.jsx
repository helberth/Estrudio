import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

export default class FieldSelectComponent extends Component {

  getValidateMessage(touched, error) {
    let message = null;
    //console.log("getValidateMessage called..");
    //console.log("error: " + error + ", touched:" + touched);

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

  render() {

    const { input, title, items, onSelectItem, meta: { touched, error } } = this.props;

    let options = ['', ...items];

    return (
      <FormGroup controlId={input.name}
        validationState={this.getValidateMessage(touched, error)} >
        <ControlLabel>{title}</ControlLabel>
        <FormControl
          componentClass="select"
          placeholder={title}
          {...input}
          >
          {
            options.map(item => {
              if (item) {
                console.log("item");
                console.log(item.getID());
                return <option
                  value={item.getID()}
                  onSelect={(val) => console.log("SELECT....")}
                  >
                  {item.getLabel()}
                </option>
              }
              else {
                return <option></option>
              }
            })
          }
        </FormControl>
        <FormControl.Feedback />
        {touched && error && <HelpBlock>{error}</HelpBlock>}
      </FormGroup>
    );
  }
}