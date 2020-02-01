import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ContactModal = ({
  open,
  toggle,
}) => (
  <Modal isOpen={open} toggle={() => toggle('contactModal')}>
    <ModalHeader toggle={() => toggle('contactModal')}>Contact</ModalHeader>
    <ModalBody>
      <h5 style={{ margin: 0 }}>Wakil Ahmad</h5>
      <a href="mailto: mahmad152213@bscse.uiu.ac.bd">mahmad152213@bscse.uiu.ac.bd</a>
      <br />
      <br />
      <h5 style={{ margin: 0 }}>Easin Arafat Roman</h5>
      <a href="mailto: marafat152047@bscse.uiu.ac.bd">marafat152047@bscse.uiu.ac.bd</a>
      <br />
      <br />
      <h5 style={{ margin: 0 }}>Shubhashis Roy Dipta</h5>
      <a href="mailto: iamdipta@gmail.com">iamdipta@gmail.com</a>
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={() => toggle('contactModal')}>Close</Button>
    </ModalFooter>
  </Modal>
);

export default ContactModal;
