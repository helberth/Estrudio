import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';
import { Button, Checkbox } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import Modal from 'react-bootstrap/lib/Modal';

export default class ConfigQuizComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openConfig: false
    };

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const { title } = this.props;

    return <div>
      <Button
        bsStyle={'warning'}
        onClick={() => this.setState({ openConfig: !this.state.openConfig })}
      >
        <FontAwesome name={'cog'} />
        {' ' + title}
      </Button>
      <Modal show={this.state.openConfig} onHide={() => this.setState({ openConfig: false })}>
        <Modal.Header closeButton>
          <Modal.Title>Configuración</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Checkbox inline>
            Orden Aleatorio en las respuestas
                      </Checkbox>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.setState({ openConfig: false })}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  }
};

ConfigQuizComponent.propTypes = {
  title: PropTypes.string.isRequired,
}