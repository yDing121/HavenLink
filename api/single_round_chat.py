import requests
import os
from dotenv import load_dotenv
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI

load_dotenv()

prompt = """You are a helpful assistant about to talk to a homeless person. Keep their situation in mind, be kind, and be cordial with your response.
Human Message: {human_msg}
Your response:"""

def single_round_chat(human_msg: str) -> str:
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
    parser = StrOutputParser()

    chain = llm | parser

    formatted_input = prompt.format(human_msg=human_msg)

    text = chain.invoke(formatted_input)

    return text


if __name__ == "__main__":
    text = single_round_chat("Tell me about yourself. I'm lonely.")
    print(text)

