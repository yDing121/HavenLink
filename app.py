from flask import Flask, render_template, request, jsonify
import os
from api.audio_path_to_command import audio_path_to_command
from config import ROOT
from data.database import shelter_db, food_bank_db 

app = Flask(__name__)

# Dummy function for process API (replace with actual API call)
def process(audio_file_path):
    return audio_path_to_command(audio_file_path)

def filter_nearby_places(db, max_distance=3.0):
    return [place for place in db if place["distance"] <= max_distance]

# API endpoint to get nearby shelters
@app.route('/GetShelter', methods=['GET'])
def get_shelter():
    address = request.args.get('address')
    if not address:
        return jsonify({"error": "Address parameter is required"}), 400
    
    nearby_shelters = filter_nearby_places(shelter_db)
    return jsonify(nearby_shelters)

# API endpoint to get nearby food banks
@app.route('/GetFoodBanks', methods=['GET'])
def get_food_banks():
    address = request.args.get('address')
    if not address:
        return jsonify({"error": "Address parameter is required"}), 400
    
    nearby_food_banks = filter_nearby_places(food_bank_db)
    return jsonify(nearby_food_banks)

# API endpoint to get mental health support hotline
@app.route('/GetMentalHealthSupport', methods=['GET'])
def get_mental_health_support():
    hotline_number = "1-800-123-4567"
    return jsonify({"hotline": hotline_number})

# API endpoint to get emergency call number
@app.route('/EmergencyCall', methods=['GET'])
def emergency_call():
    return jsonify({"emergency_number": "911"})


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/upload', methods=['POST'])
def upload():
    if 'audio_data' not in request.files:
        return "No audio file found", 400

    audio = request.files['audio_data']
    audio_path = os.path.join("uploads", audio.filename)
    audio.save(audio_path)

    # Call process() API with the saved audio
    result = process(audio_path)

    return jsonify({'result': result})


if __name__ == '__main__':
    if not os.path.exists("uploads"):
        os.makedirs("uploads")
    app.run(debug=True, port=6969)
