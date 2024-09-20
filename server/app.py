
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
import datetime
import os

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# JWT Configuration
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your_jwt_secret_key')
jwt = JWTManager(app)

# MongoDB Configuration (Now using only one database: 'iplapp')
app.config["MONGO_URI"] = os.getenv('MONGO_URI', 'mongodb://localhost:27017/iplapp')
client = MongoClient(app.config["MONGO_URI"])
db = client['iplapp']  # Use 'iplapp' database for both user and player data

# Collections inside the 'iplapp' database
users_collection = db['users']       # Collection for user authentication
player_collection = db['players']    # Collection for player data

# Home route
@app.route('/', methods=['GET'])
def home():
    return jsonify({"msg": "Welcome to the API"}), 200

# Registration route
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"msg": "Username and password are required"}), 400

    if users_collection.find_one({'username': username}):
        return jsonify({"msg": "Username already exists"}), 400

    hashed_password = generate_password_hash(password)
    users_collection.insert_one({
        'username': username,
        'password': hashed_password
    })

    return jsonify({"msg": "User registered successfully"}), 201

# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"msg": "Username and password are required"}), 400

    user = users_collection.find_one({'username': username})

    if not user or not check_password_hash(user['password'], password):
        return jsonify({"msg": "Invalid username or password"}), 401

    access_token = create_access_token(identity=str(user['_id']), expires_delta=datetime.timedelta(hours=1))
    return jsonify(access_token=access_token), 200

# Protected route (JWT required)
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = users_collection.find_one({"_id": ObjectId(current_user_id)})

    if not user:
        return jsonify({"msg": "User not found"}), 404

    return jsonify(logged_in_as=user['username']), 200

# Player search route
@app.route('/api/player/<player_name>', methods=['GET'])
def get_player(player_name):
    # Case-insensitive search using regex for exact match
    player_data = player_collection.find_one({"name": {"$regex": f"^{player_name}$", "$options": "i"}})
    
    if player_data:
        player_data["_id"] = str(player_data["_id"])  # Convert ObjectId to string
        return jsonify(player_data)
    else:
        return jsonify({"error": "Player not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
