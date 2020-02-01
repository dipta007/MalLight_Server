import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { fasta } from './placeholder';

const ExampleModal = ({
  open,
  toggle,
}) => (
  <Modal isOpen={open} toggle={() => toggle('exampleModal')}>
    <ModalHeader toggle={() => toggle('exampleModal')}>Example</ModalHeader>
    <ModalBody>
      <div className="dont-break-out">
        {fasta}
      </div>
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={() => toggle('exampleModal')}>Close</Button>
    </ModalFooter>
  </Modal>
);

export default ExampleModal;
