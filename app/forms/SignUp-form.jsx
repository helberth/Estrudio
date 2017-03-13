import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { Grid, Row, Col, Jumbotron, Button, Form, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form'

import FieldFormComponent from '../components/FieldForm-component'
import FieldButtonComponent from '../components/FieldButton-component'
import FieldButtonIconComponent from '../components/FieldButtonIcon-component'

const formName = 'SignUpForm';

const validate = values => {
  const errors = {}

  if (!values.name) {
    errors.name = 'Required'
  } else if (values.name.length < 4) {
    errors.name = 'Must be 4 characters or more'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 6) {
    errors.password = 'Must be 6 characters or more'
  }

  return errors
}

class SignUpForm extends React.Component {

  constructor(props, context) {
    super(props, context)
  }

  render() {

    //redux-form propTypes
    const { handleSubmit, pristine, reset, submitting } = this.props

    //mapDispatchToProps
    const { signInWithGithub, signInWithGoogle, signInWithTwitter } = this.props;

    return <Grid>
      <Row >
        <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3}>
          <Jumbotron>
            <div className="text-center">
              <h4>Registro</h4>
              <Form onSubmit={handleSubmit(this.props.signUpUser.bind(this)) }>
                <Field
                  name="name"
                  type="text"
                  component={ FieldFormComponent }
                  placeholder={ "Nombre" }
                  />
                <Field
                  name="email"
                  type="text"
                  component={ FieldFormComponent }
                  placeholder={ "Email" }
                  />
                <Field
                  name="password"
                  type="password"
                  component={ FieldFormComponent }
                  placeholder={ "Contraseña" }
                  />
                <Field
                  name="submit"
                  type="submit"
                  component={ FieldButtonComponent }
                  placeholder={ "Empieza ahora" }
                  submitting={submitting}
                  style={"success"}
                  />
                <hr/>
                <Field
                  name="submit"
                  component={ FieldButtonIconComponent }
                  placeholder={ "Registro con Google" }
                  submitting={submitting}
                  style={"danger"}
                  buttonClassname={"google-login"}
                  onClick={signInWithGoogle}
                  fontawesome={"google-plus"}
                  labelClassname={"sign_in_label"}
                  />
              </Form>
            </div>
          </Jumbotron>
        </Col>
      </Row>
    </Grid>
  }
}

SignUpForm.contextTypes = {
  router: React.PropTypes.object.isRequired,
  store: React.PropTypes.object
}

export default (reduxForm({
  form: formName,
  validate
})(SignUpForm));
