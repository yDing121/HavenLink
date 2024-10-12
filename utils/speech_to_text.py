import speech_recognition as sr
from config import ROOT

def speech_to_text(fpath:str):
    recognizer = sr.Recognizer()

    with sr.AudioFile(fpath) as source:
        audio_data = recognizer.record(source)

        try:
            text = recognizer.recognize_google(audio_data)
            print("Converted Text:", text)
            return(text)
        except sr.UnknownValueError:
            print("Speech Recognition could not understand the audio")
            return None
        except sr.RequestError as e:
            print(f"Could not request results from Google Speech Recognition service; {e}")
            return None


if __name__ == '__main__':
    t = speech_to_text(f"{ROOT}/processed/audio.wav")
    print(t)
