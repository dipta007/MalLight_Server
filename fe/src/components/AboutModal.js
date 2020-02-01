import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const AboutModal = ({
  open,
  toggle,
}) => (
  <Modal isOpen={open} toggle={() => toggle('aboutModal')}>
    <ModalHeader toggle={() => toggle('aboutModal')}>ABOUT BRL</ModalHeader>
    <ModalBody>
      Bioinformatics Research Laboratory at United International University aims to develop solutions for computational problems in Bioinformatics, Computational Biology and related fields.
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={() => toggle('aboutModal')}>Close</Button>
    </ModalFooter>
  </Modal>
);

export default AboutModal;
