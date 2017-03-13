
import React, { Component, PropTypes } from 'react'
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

export default class ModalComponent extends Component {
  render() {

    //props
    const { show, title, message, size } = this.props;

    //handlers
    const { handleHide, noautohide } = this.props;
    
    return (
    
    <Modal show={show} bsSize={ size == null ? "small" : size } onHide={noautohide ? undefined : handleHide}>
      <Modal.Header closeButton={!noautohide}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { message }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleHide}>Close</Button>
      </Modal.Footer>
    </Modal>

  )
  }
};

ModalComponent.propTypes = {
    title: PropTypes.string.isRequired,
    //message: PropTypes.string.isRequired,
    handleHide: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
  };

