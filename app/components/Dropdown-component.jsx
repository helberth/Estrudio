import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';
import { FormGroup, FormControl, HelpBlock, DropdownButton, MenuItem } from 'react-bootstrap';

export default class DropdownComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.getValueOfItem = this.getValueOfItem.bind(this);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

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

  handleSelect(values) {
    const { changeValue, input, onSelectItem } = this.props;
    changeValue(input.name, values);

    if (onSelectItem) {
      onSelectItem(values);
    }

  }

  getValueOfItem(id) {
    let value;
    const { items } = this.props;
    const selectedQuestiontype = items.find(item => item.getID() == id);

    if (selectedQuestiontype)
      value = selectedQuestiontype.getLabel();

    return value;
  }

  render() {
    const { input, title, items, selectedLabel, meta: { touched, error }, disabled } = this.props;

    return <div>
      <FormGroup controlId={input.name}
        validationState={this.getValidateMessage(touched, error)} >
        <DropdownButton
          bsStyle="success"
          title={selectedLabel || title}
          id={input.name}
          onSelect={this.handleSelect}
          disabled={disabled}
          {...input}
        >
          {
            items.map(item => {
              if (item) {
                return <MenuItem
                  eventKey={item.getID()}
                  value={item.getID()}
                >
                  {item.getLabel()}
                </MenuItem>
              }
            })
          }
        </DropdownButton>
        <FormControl.Feedback />
        {touched && error && <HelpBlock>{"Escoja un tipo de Pregunta"}</HelpBlock>}
      </FormGroup>
    </div>
  }
};

DropdownComponent.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired,
  changeValue: PropTypes.func.isRequired

}