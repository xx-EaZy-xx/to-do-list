import React, { useState } from 'react'
import Modal from 'react-modal'

export default function ModalWindow({ child }) {
  let subtitle
  Modal.setAppElement('#modal')

  const [modalIsOpen, setModalIsOpen] = useState(false)

  function toggleModal() {
    setModalIsOpen(!modalIsOpen)
  }

  return (
    <div id="modal">
      <button
        style={{
          backgroundColor: 'transparent',
          maxWidth: '30px',
          fontSize: '40px',
        }}
        type="button"
        onClick={toggleModal}
      >
        Open Modal
      </button>
      <Modal
        isOpen={modalIsOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button type="button" onClick={toggleModal}>
          close
        </button>
      </Modal>
    </div>
  )
}
