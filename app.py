from flask import Flask, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)

# MongoDB configuration
app.config["MONGO_URI"] = "mongodb://localhost:27017/iplapp"
mongo = PyMongo(app)

# Enable CORS for all routes
CORS(app)

# Define the collection name
player_collection = mongo.db.players

@app.route('/api/player/<player_name>', methods=['GET'])
def get_player(player_name):
    # Case-insensitive search using regex for exact match
    player_data = player_collection.find_one({"name": {"$regex": f"^{player_name}$", "$options": "i"}})
    
    if player_data:
        player_data["_id"] = str(player_data["_id"])  # Convert ObjectId to string if necessary
        return jsonify(player_data)
    else:
        return jsonify({"error": "Player not found"}), 404


if __name__ == "__main__":
    app.run(debug=True)
