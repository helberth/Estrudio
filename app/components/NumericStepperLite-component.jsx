import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
    FormGroup, FormControl, ControlLabel, HelpBlock,
    InputGroup, Button, ButtonGroup
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

export default class NumericStepperLiteComponent extends Component {

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
        //this.setState({ count: this.state.count += 1 });
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

        const { input, placeholder, style, meta: { touched, error }, initialValues } = this.props;
        return (
            <div className='container_numericstepperlite'>

                <div className='leftContent'>
                    <div className='centerContent'><h3>{input.value}</h3></div>
                </div>
                <div className='rightContent'>
                    <Button
                        bsSize="lg"
                        bsStyle={style}
                        onClick={this.decrement}
                    >
                        <FontAwesome name={"angle-up"} />
                    </Button>
                    <Button
                        bsSize="lg"
                        bsStyle={style}
                        onClick={this.increment}
                    >
                        <FontAwesome name={"angle-down"} />
                    </Button>
                </div>


            </div>
        );
    }
}