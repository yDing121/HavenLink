from os import mkdir

import librosa
import numpy as np
import soundfile as sf
from config import ROOT

def preprocess_audio(fpath: str, target_sample_rate=16000):
    fpath = f"{fpath}"
    print(fpath)
    audio, sample_rate = librosa.load(fpath, sr=None)

    # Denoise
    audio = librosa.effects.preemphasis(audio)

    # Resample if needed
    if sample_rate != target_sample_rate:
        audio = librosa.resample(audio, orig_sr=sample_rate, target_sr=target_sample_rate)

    # Normalize amplitude
    audio = librosa.util.normalize(audio)

    # Convert to mono
    if audio.ndim > 1:
        audio = librosa.to_mono(audio)

    out_fpath = f"{ROOT}/processed/audio.wav"
    try:
        sf.write(out_fpath, audio, target_sample_rate)
    except RuntimeError:
        mkdir(f"{ROOT}/processed/")
        sf.write(out_fpath, audio, target_sample_rate)

    return out_fpath, audio, target_sample_rate


if __name__ == '__main__':
    preprocess_audio("uploads/recording.wav")