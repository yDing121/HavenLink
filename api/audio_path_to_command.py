from utils.preprocess_audio import preprocess_audio
from utils.speech_to_text import speech_to_text
from config import ROOT
from langchain_openai import ChatOpenAI
from src.command_schema import template, accepted_commands
from langchain_core.output_parsers import StrOutputParser


def audio_path_to_command(audio_file_path: str) -> str:
    # Audio preprocessing and text extraction
    out_path, _, _2 = preprocess_audio(audio_file_path)
    # print("check1")
    text = speech_to_text(out_path)
    # print("check2")

    formatted_input = template.format(commands_with_docs=accepted_commands, human_message=text)
    model = ChatOpenAI(model="gpt-4o-mini", temperature=0)
    parser = StrOutputParser()

    chain = model | parser

    output = chain.invoke(formatted_input)

    return output


if __name__ == '__main__':
    fpath = f"/processed/audio.wav"
    t = audio_path_to_command(fpath)
    print(t)