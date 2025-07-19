import { useState } from "react";

/**
 * ContactForm component allows users to create a new contact by filling out a form.
 * It captures the user's first name, last name, and email, and submits the data to a backend API.
 *
 * @component
 * @example
 * return (
 *   <ContactForm />
 * )
 *
 * @param {Object} props - The props object.
 * @returns {JSX.Element} A form for creating a new contact.
 */
const ContactForm = ({ existingContact = {}, updateCallback} ) => {
    const [firstName, setFirstName] = useState(existingContact.firstName || "");
    const [lastName, setLastName] = useState(existingContact.lastName || "");
    const [email, setEmail] = useState(existingContact.email || "");
    const baseUrl = "http://127.0.0.1:5000/"
    const updating = Object.entries(existingContact).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()
        
        const data = {
            firstName,
            lastName,
            email
        }

        const url = baseUrl + (updating ? `update_contact/${existingContact.id}` : "create_contact")
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            updateCallback()
        }
    }

    return <form onSubmit={onSubmit}>
        <div>
            <label htmlFor="firstName" className="form-label">First Name:</label>
            <input 
                type="text" 
                id="firstName" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
            />
        </div>
        <div>
            <label htmlFor="lastName" className="form-label">Last Name:</label>
            <input 
                type="text" 
                id="lastName" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
            />
        </div>
        <div>
            <label htmlFor="email" className="form-label">Email</label>
            <input 
                type="text" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
        </div>
        <button type="submit" className="create-contact">{updating ? "Update Contact" : "Create Contact"}</button>
    </form>
};

export default ContactForm