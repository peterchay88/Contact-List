from config import db

class Contact(db.Model):
    """
    Creating the DB model for contact
    """
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def to_json(self) -> dict:
        """
        Takes the different fields from the DB and returns it in a JSON format

        Returns:
            dict: JSON response
        """
        return {
            "id" : self.id,
            "firstName" : self.first_name,
            "lastName" : self.last_name,
            "email" : self.email
        }
