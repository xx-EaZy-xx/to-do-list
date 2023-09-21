import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'

export default function ModalWindow({}) {
  let subtitle
  Modal.setAppElement('#app')

  const [modalIsOpen, setModalIsOpen] = useState(true)

  function openModal() {
    setModalIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f29'
  }

  function closeModal() {
    setModalIsOpen(false)
  }

  return (
    <div id="app">
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </div>
  )
}
