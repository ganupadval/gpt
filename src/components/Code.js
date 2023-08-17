import React, { useState } from 'react';
import Modal from 'react-modal';

const Code = ({code}) => {
    const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <div>
        <div>
      <button onClick={openModal}>View Code</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Code Modal"
      >
        <pre>
          <code>{code}</code>
        </pre>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
    </div>
  )
}

export default Code
