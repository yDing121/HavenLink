from typing import Optional

from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv
from langchain_openai.chat_models import ChatOpenAI

load_dotenv()

accepted_commands = {
    "getshelter": "If the user is seeking a homeless shelter or somewhere to stay, select this command",
    "getfoodbanks": "If the user is seeking food banks or pantries, select this command",
    "getmentalhealthsupport": "If the user is seeking mental health support with regards to issues like depression and addiction, select this command",
    "emergencycall": "If the user needs immediate medical attention or is in another emergency, select this command"
}

template = """
You are a command extraction assistant. Given the following human message, 
you must identify and extract the most fitting command from the list of accepted commands. 
You must choose one command and nothing else, and return the command name verbatim.
If the user's request does not match any of the commands, return "unknown".

Accepted commands and their descriptions:
{commands_with_docs}

Human message:
"{human_message}"

Please respond with only the extracted command:
"""


if __name__ == '__main__':
    text = "Where is the nearest food pantry"
    from dotenv import load_dotenv
    load_dotenv()

    formatted_input = template.format(commands_with_docs=accepted_commands, human_message=text)
    model = ChatOpenAI(model="gpt-4o-mini", temperature=0)
    parser = StrOutputParser()

    chain = model | parser

    output = chain.invoke(formatted_input)
    print(output)
