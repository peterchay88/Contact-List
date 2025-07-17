import { useState, useEffect } from 'react'
import ContactList from './ContactsList'
import ContactForm from './ContactForm'
import './App.css'

function App() {
  const [contacts, setContacts] = useState([])
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


  return (
    <>
      <ContactList contacts={contacts} />
      <ContactForm />
    </>
  )
}

export default App
