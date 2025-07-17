from flask import request, jsonify, Response
from config import app, db
from models import Contact


@app.route("/contacts", methods=["GET"])
def get_contacts() -> Response:
    """
    GET endpoint to return all contacts.
    Returns:
        JSON response from contacts endpoint.
        Example:
        {
            "contacts": [
                {"id": 1, "name": "John Doe"},
                {"id": 2, "name": "Jane Smith"}
            ]
        }
    """
    contacts = Contact.query.all()
    json_contacts = [x.to_json() for x in contacts]
    return jsonify({"contacts": json_contacts}), 200


@app.route("/create_contact", methods=["POST"])
def create_contact() -> Response:
    """
    POST request to create new contact
    Returns:
        Response: JSON response from contacts endpoint.
    """
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")

    if not first_name or not last_name or not email:
        return (
            jsonify({"message": "You must include a first name, last name, and email"}), 
            400
        )
    
    new_contact = Contact(first_name=first_name, last_name=last_name, email=email)
    try:  # Try to add new contact to db, if it fails return 400
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "User created!"}), 201


@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
def update_contact(user_id) -> Response:
    """
    PATCH request used to update a contact
    Args:
        user_id (int): User ID of user to be updated
    Returns:
        Response: JSON response from contacts endpoint.
    """
    contact = Contact.query.get(user_id)

    if not contact:
        return jsonify({"message": "User not found"}), 404
    
    data = request.json
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)

    db.session.commit()
    
    return jsonify({"message" : f"User {user_id} updated "}), 201


@app.route("/delete_contact/<int:user_id>", methods=["DELETE"])
def delete_contact(user_id) -> Response:
    """
    DELETE request used to delete a contact
    Args:
        user_id (int): User ID of user to be updated
    Returns:
        Response: JSON response from contacts endpoint.
    """
    contact = Contact.query.get(user_id)

    if not contact:
        return jsonify({"message": "User not found"}), 404
    
    db.session.delete(contact)
    db.session.commit()

    return jsonify({"message": f"User: {user_id} deleted!"}), 200


if __name__ == "__main__":
    # Spin up database if it does not already exist
    with app.app_context():
        db.create_all()


    app.run(debug=True)

