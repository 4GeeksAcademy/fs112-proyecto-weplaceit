"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import datetime
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Configure JWT
app = Flask(__name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def handle_login():
    data = request.get_json()
    
    email = data.get('email')
    password = data.get('password')
    
    response_body = {
        
    }
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400
    
    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify({"error": "Invalid email or password"}), 401

    # Genera un token de acceso
    access_token = create_access_token(
        identity=user.id,  # Identidad del usuario (puedes usar el ID o el email)
        expires_delta=datetime.timedelta(hours=24)  # Expiración del token
    )

    response_body["user"] = user.serialize()
    response_body["token"] = access_token
    
    return jsonify(response_body), 200
