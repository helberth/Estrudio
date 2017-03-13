import React, { Component } from 'react';
import { FormGroup, Button } from 'react-bootstrap';

const FieldButtonComponent = ({ input, placeholder, type, submitting, style, onClick }) => (
  <FormGroup controlId={input.name}>
    <Button
      type={type}
      bsStyle={style}
      disabled={submitting}
      onClick={ onClick } >
      {submitting ? <i/> : <i/>} {placeholder}
    </Button>
  </FormGroup>
)

export default FieldButtonComponent;