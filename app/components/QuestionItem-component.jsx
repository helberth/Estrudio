import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
    FormGroup, FormControl, ControlLabel, HelpBlock,
    InputGroup, Button, ButtonGroup, Grid, Row, Col, Checkbox, ListGroup, ListGroupItem, Panel
} from 'react-bootstrap';
import { Field, FieldArray, reduxForm } from 'redux-form'

import FieldFormComponent from './FieldForm-component'
import FieldButtonComponent from './FieldButton-component'
import FieldButtonIconComponent from './FieldButtonIcon-component'

import NumericStepperLiteComponent from '../components/NumericStepperLite-component'

const renderField = ({ input, label, type, meta: { touched, error }, value }) => {
    console.log("renderField. input:");
    console.log(input);
    return (
        <div>
            <label>{label}</label>
            <div>
                <input {...input} type={type} placeholder={label} />
                {touched && error && <span>{error}</span>}
            </div>
        </div>
    )
}

const renderCheckbox = ({ input, label, type, meta: { touched, error }, initialValues }) => {
    console.log("renderField. input:");
    console.log(input);

    return (
        <div>
            <div>
                <input {...input} type={type} placeholder={label} checked={initialValues} />
                {touched && error && <span>{error}</span>}
                <ControlLabel>Correcta</ControlLabel>
            </div>
        </div>
    )
}


export default class QuestionItemComponent extends Component {

    constructor(props) {
        super(props);
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


    render() {
        const { fields, meta: { touched, error }, initialValues, blurValue } = this.props;
        return (
            <div>
                {touched && error && <span>{error}</span>}


                {fields.map((option, index) => {
                    let title = '';
                    let correct = '';
                    let order= '';
                    if (initialValues.options.length > index) {
                        title = initialValues.options[index].title;
                        correct = initialValues.options[index].correct;
                        order = initialValues.options[index].order;
                    }
                    
                    return (
                        <Panel bsStyle="default" key={index}>
                            <Row>
                                <Col xs={12} sm={9} md={9} >
                                    <Field
                                        name={`${option}.title`}
                                        type="text"
                                        component={FieldFormComponent}
                                        placeholder={'Opcion #' + (index + 1)}
                                        initialValues={title}
                                        blurValue={blurValue}
                                        />
                                        <Field
                                        name={'remove'}
                                        component={FieldButtonIconComponent}
                                        placeholder={"Eliminar"}
                                        style={"danger"}
                                        //buttonClassname={"google-login"}
                                        onClick={() => fields.remove(index)}
                                        fontawesome={"trash"}
                                        labelClassname={"sign_in_label"}
                                        />
                                </Col>
                                <Col xs={12} sm={3} md={3}  >
                                    <Field
                                        name={`${option}.order`}
                                        component={NumericStepperLiteComponent}
                                        placeholder={"Orden..."}
                                        style={"success"}
                                        blurValue={blurValue}
                                        min={1}
                                        max={4}
                                        step={1}
                                        initialValues={order}
                                        >
                                        Orden
                                </Field>

                                </Col>
                            </Row>
                        </Panel>
                    )
                }

                )}

                <Field
                    name="add"
                    type="button"
                    component={FieldButtonComponent}
                    placeholder={"Agregar"}
                    onClick={() => fields.push({})}
                    style={"primary"}
                    />

            </div>

        );
    }
}