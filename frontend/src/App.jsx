import { useState, useEffect } from 'react'
import ContactList from './ContactsList'
import ContactForm from './ContactForm'
import './App.css'

function App() {
  const [contacts, setContacts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({})
  const baseUrl = "http://127.0.0.1:5000"

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    const response = await fetch(`${baseUrl}/contacts`)
    const data = await response.json()
    setContacts(data.contacts)
    console.log(data.contacts)
  }

  /**
   * Close modal 
   */
  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentContact({})
  }

  /**
   * Open modal for creating a new contact
   */
  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  /**
   * Open modal for editing a contact
   * @param {*} contact contact being edited
   * @returns 
   */
  const openEditModal = (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchContacts()
  }

  return (
    <>
      <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate} />
      <button onClick={openCreateModal}>Create New Contact</button>
      { isModalOpen && <div className='modal'>
        <div className='modal-content'>
          <span className='close' onClick={closeModal}>&times;</span>
          <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
        </div>
      </div>
      }
    </>
  )
}

export default App

