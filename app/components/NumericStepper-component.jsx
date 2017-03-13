import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
    FormGroup, FormControl, ControlLabel, HelpBlock,
    InputGroup, Button, ButtonGroup, Grid, Row, Col
} from 'react-bootstrap';

export default class NumericStepperComponent extends Component {

    constructor(props) {
        super(props);
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    increment() {
        const { input, blurValue, min, max, step } = this.props;
        const value = input.value + step;
        if (value <= max) {
            blurValue(input.name, value);
        }
    }

    decrement() {
        const { input, blurValue, min, max, step } = this.props;
        const value = input.value - step;
        if (value >= min) {
            blurValue(input.name, value);
        }
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

    componentDidMount() {
        const { input, initialValues, blurValue } = this.props;
        if (initialValues) {
            blurValue(input.name, initialValues);
        }
    }

    render() {
        const { input, placeholder, style, meta: { touched, error }, initialvalue } = this.props;
        return (
            <Grid className='container_numericstepper'>
                <FormGroup controlId={input.name}
                    validationState={this.getValidateMessage(touched, error)}
                >
                    <ControlLabel>{this.props.children}</ControlLabel>
                    <Row>
                        <Col xs={12} md={6} sm={6} >
                            <FormControl
                                type={"number"}
                                placeholder={placeholder}
                                //value={input.value}
                                {...input}
                            />
                            <FormControl.Feedback />
                            {touched && error && <HelpBlock>{error}</HelpBlock>}

                        </Col>
                        <Col xs={12} md={6} sm={6} className='text-xs-center'>
                            <Button
                                bsStyle={style}
                                className='btn_numericstepper'
                                onClick={this.decrement} >
                                {"-"}
                            </Button>
                            <Button
                                bsStyle={style}
                                className='btn_numericstepper'
                                onClick={this.increment} >
                                {"+"}
                            </Button>
                        </Col>
                    </Row>
                </FormGroup>
            </Grid>
        );
    }
}