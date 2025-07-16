import React from "react";

/**
 * Creates the layout of the page 
 * @param {*} param0 
 */
const ContactList = ({contacts}) => {
    return <div>
        <h2>Contacts</h2>
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact) =>(
                    <tr></tr>
                ))}
            </tbody>
        </table>
    </div>

}