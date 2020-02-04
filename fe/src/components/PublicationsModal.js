import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const PublicationsModal = ({
  open,
  toggle,
}) => (
  <Modal isOpen={open} toggle={() => toggle('publicationsModal')}>
    <ModalHeader toggle={() => toggle('publicationsModal')}>Publications</ModalHeader>
    <ModalBody>
    M. W. Ahmad, M. E. Arafat, G. Taherzadeh, A. Sharma, S. R. Dipta, A. Dehzangi, & S. Shatabda, “Mal-Light: Enhancing Lysine Malonylation Sites Prediction Problem Using Evolutionary-based Features”, (Submitted in IEEE Access).
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={() => toggle('publicationsModal')}>Close</Button>
    </ModalFooter>
  </Modal>
);

export default PublicationsModal;
