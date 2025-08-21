"""
Este módulo se encarga de inicializar el servidor API, cargar la Base de Datos y añadir los Endopoints
"""
import datetime
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash


# Registrar el blueprint
api = Blueprint('api', __name__)
# app.register_blueprint(api, url_prefix='/api')  ---> ESTÁ EN "app.py"


##################################################
### CORS implementación
CORS(api) # Permite peticiones CORS hacia esta API
##################################################


# Configurar JWT ??? ---> está configurado en "app.py"


app = Flask(__name__)



#############################################
## Endpoint de ejemplo
@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "msg": "¡Hola! Soy un mensaje del backend. Revisa la pestaña de red en Google Inspector y verás la solicitud GET"
    }
    return jsonify(response_body), 200
#############################################




############################################
#######     SIGN-UP (registrarse)    #######
############################################
""" JSON de registro de usuario:
{ 
    "first_name": "name_example",
    "last_name":  "name-example",
    "username":   "username_example",
    "email":      "example@email.com", 
    "password":   "example_password"
}
"""
@api.route('/signup', methods=['POST'])
def signup():

    # Se reciben los datos
    data = request.get_json()
    
    first_name = data.get("first_name")
    last_name  = data.get("last_name")
    username   = data.get("username")
    email      = data.get("email")
    password   = data.get("password")


    # Manejo de falta de datos o usuario existente
    if not first_name or not last_name or not username or not email or not password:
        return jsonify({ "msg": "Todos los campos son obligatorios." }), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({ "msg": "Este correo electrónico ya está registrado." }), 400


    # Se encripta la contraseña
    hashed_password = generate_password_hash(password)


    # Se crea el nuevo usuario en la base de datos
    new_user = User( email=email,
                     username=username,
                     first_name=first_name,
                     last_name=last_name,
                     password=hashed_password,
                     is_active=True)

    db.session.add(new_user)
    db.session.commit()


    return jsonify({
        "msg": "Usuario creado.",
        "Nuevo usuario": new_user.serialize() 
    }), 201




############################################
#######    LOG-IN (iniciar sesión)   #######
############################################
""" JSON request body para Log-in:
{
    "email":    "email@ejemplo.com",
    "password": "tu_contraseña"
}
"""
@api.route('/login', methods=['POST'])
def handle_login():

    # Se reciben los datos (correo y contraseña)
    data = request.get_json()
    email    = data.get("email")
    password = data.get("password")
    

    # Se revisa si ambos campos existen
    if not email or not password:
        return jsonify({"error": "Email y contraseña son necesarios"}), 400
    

    # Se busca el usuario en base de datos filtrando solo por el mail (único)
    user = User.query.filter_by(email=email).first()


    # Se verifica si el usuario y/o la contraseña existen
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    if not check_password_hash(user.password, password):
        return jsonify({"msg": "Contraseña incorrecta"}), 401


    # Verifica si el usuario está desactivado
    if not user.is_active:
        return jsonify({"error": "Usuario ha sido desactivado"}), 401

    try:
        # Genera un token de acceso (con expiración)
        access_token = create_access_token(
            identity=str(user.id),  # Identidad del usuario (puedes usar el ID o el email)
            expires_delta=datetime.timedelta(hours=24)  # Expiración del token
        )

        return jsonify({
            "access_token": access_token,
            "user": user.serialize()
        }), 200
    
    except Exception as e:
        return jsonify({"error": "Error al generar token", 'message': str(e)}), 500



############################################
#######     PRIVATE SITE TESTING     #######
############################################
""" 
Cómo añadir el Access_Token en el header en Postman:
    - Ir a la pestaña ·Authorization"
    - Elegir "Bearer Toker" en el dropdown
    - Pegar el token SIN COMILLAS
"""
@api.route('/testing-private', methods=['GET'])
@jwt_required() # Uso del JWT
def private_route():

    current_user_id = get_jwt_identity()

    user = User.query.get(current_user_id)

    if not user:
        return jsonify({ "msg": "Usuario no encontrado." }), 404
    
    return jsonify({
        "msg": f"Welcome {user.email}!",
        "user": user.serialize()
    }), 200

