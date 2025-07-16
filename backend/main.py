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
    return jsonify({"contacts": json_contacts})


@app.route("/create_contact", methods=["POST"])
def create_contact():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")



if __name__ == "__main__":
    # Spin up database if it does not already exist
    with app.app_context():
        db.create_all()

    app.run(debug=True)
