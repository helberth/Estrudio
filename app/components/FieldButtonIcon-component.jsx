import React, { Component } from 'react';
import { FormGroup, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

const FieldButtonIconComponent = ({ input, placeholder, submitting, 
  style, buttonClassname, onClick, fontawesome, labelClassname }) => (
    <FormGroup controlId={input.name}>
      <Button
        bsStyle={style}
        disabled={submitting}
        className={buttonClassname}
        onClick={onClick}
        >
        { fontawesome && <FontAwesome name={fontawesome} /> }
        {' '}
        <span className={labelClassname}>
          {submitting ? <i/> : <i/>} {placeholder}
        </span>
      </Button>
    </FormGroup>
  )

export default FieldButtonIconComponent;
