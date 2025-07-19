import { useState, useEffect } from 'react'
import ContactList from './ContactsList'
import ContactForm from './ContactForm'
import './App.css'

function App() {
  const [contacts, setContacts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
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
  }

  /**
   * Open modal
   */
  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  return (
    <>
      <ContactList contacts={contacts} />
      <button onClick={openCreateModal}>Create New Contact</button>
      { isModalOpen && <div className='modal'>
        <div className='modal-content'>
          <span className='close' onClick={closeModal}>&times;</span>
          <ContactForm />
        </div>
      </div>
      }
    </>
  )
}

export default App
