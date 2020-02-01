import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const PublicationsModal = ({
  open,
  toggle,
}) => (
  <Modal isOpen={open} toggle={() => toggle('publicationsModal')}>
    <ModalHeader toggle={() => toggle('publicationsModal')}>Publications</ModalHeader>
    <ModalBody>
      On Press
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={() => toggle('publicationsModal')}>Close</Button>
    </ModalFooter>
  </Modal>
);

export default PublicationsModal;
