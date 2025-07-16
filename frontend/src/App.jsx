import { useState, useEffect } from 'react'
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
    
    </>
  )
}

export default App
