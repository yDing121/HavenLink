from flask import Flask, render_template, request, jsonify
import os
from api.audio_path_to_command import audio_path_to_command
from api.weather_forecast import forecast
from config import ROOT
from data.database import shelter_db, food_bank_db, health_services,emergency_contacts
from flask_cors import CORS
from datetime import date

app = Flask(__name__)
CORS(app)

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
def health_support():
    health_services = [
        {"name": "Community Health Center", "phoneNumber": "555-1234", "address": "123 Main St."},
        {"name": "Mental Health Clinic", "phoneNumber": "555-5678", "address": "456 Elm St."},
        {"name": "Urgent Care", "phoneNumber": "555-9012", "address": "789 Maple Ave."}
    ]
    return jsonify(health_services)

# API endpoint to get emergency call number
@app.route('/EmergencyCall', methods=['GET'])
def emergency_call():
    emergency_contacts = [
        {"name": "Police", "phoneNumber": "911"},
        {"name": "Fire Department", "phoneNumber": "911"},
        {"name": "Ambulance", "phoneNumber": "911"}
    ]
    return jsonify(emergency_contacts)

@app.route('/forecast', methods=['POST'])
def get_forecast():
    # Get the ZIP code from the JSON request body
    data = request.get_json()
    zip_code = data.get('zipcode')

    if not zip_code:
        return jsonify({"error": "ZIP code is required"}), 400

    try:
        # Call the forecast function with the provided ZIP code
        text = forecast(zip_code)
        return jsonify({"forecast": text}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# @app.route('/')
# def index():
#     return render_template('index.html')


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
