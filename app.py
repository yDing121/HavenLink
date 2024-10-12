from flask import Flask, render_template, request, jsonify
import os
from utils.preprocess_audio import preprocess_audio
from utils.speech_to_text import speech_to_text
from config import ROOT

app = Flask(__name__)

# Dummy function for process API (replace with actual API call)
def process(audio_file_path):
    out_path, *_ = preprocess_audio(audio_file_path)
    t = speech_to_text(out_path)
    # Here you would process the audio file and return the result
    return f"{t}"


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
    app.run(debug=True)
