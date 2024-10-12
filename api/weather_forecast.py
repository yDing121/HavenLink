import requests
import os
from dotenv import load_dotenv
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI

load_dotenv()

from collections import defaultdict
import statistics
from datetime import date, datetime

WEATHER_SEVERITY = {
    "Thunderstorm": 5,
    "Drizzle": 4,
    "Rain": 3,
    "Snow": 2,
    "Clouds": 1,
    "Clear": 0
}

template = """You are an expert weather forecaster. 
Below, you will be given the 5-day average weather forecast with the most severe conditions recorded. 
Your style should be casual - write it like you will be telling a friend about the future weather.
You should read the information, and give a concise weather forecast for the next 5 days.
For reference, today's date is {today}, it is {dotw}, and the location is {location}. 
Your audience will be the homeless, so keep that in mind.

Below is the aforementioned daily forecast:
---
{five_day_forecast}
---
Write the weather forecast as a single paragraph. Be cordial and concise, and use colloquially understandable words.
Don't use markdown, and use days of the week or relative terms for dates."""

def get_most_severe_weather(conditions):
    """ Returns the most severe weather condition from a list of conditions. """
    return max(conditions, key=lambda cond: WEATHER_SEVERITY.get(cond, 0))


def compute_daily_summary(forecast_list):
    # Group the forecasts by day (ignoring time)
    daily_data = defaultdict(
        lambda: {"temperatures": [], "feels_like": [], "conditions": [], "precipitation_probs": []})

    for forecast in forecast_list:
        date = forecast["Time"].split(" ")[0]  # Extract the date part (YYYY-MM-DD)
        daily_data[date]["temperatures"].append(forecast["Temperature"])
        daily_data[date]["feels_like"].append(forecast["Feels like"])
        daily_data[date]["conditions"].append(forecast["Weather Condition"])
        daily_data[date]["precipitation_probs"].append(forecast["Precipitation Probability"])

    # Compute daily summaries
    daily_summary = []

    for date, data in daily_data.items():
        summary = {
            "Date": date,
            "Average Temperature": round(statistics.mean(data["temperatures"]), 2),
            "Feels Like": round(statistics.mean(data["feels_like"]), 2),
            "Weather Condition": get_most_severe_weather(data["conditions"]),
            "Precipitation Probability": max(data["precipitation_probs"])
        }

        date_obj = datetime.strptime(date, '%Y-%m-%d')
        summary["Weekday"] = date_obj.strftime("%A")
        # print(summary["Weekday"])
        daily_summary.append(summary)

    return daily_summary


def get_weather_forecast(zip_code):
    # Convert ZIP code to coordinates using OpenWeatherMap Geocoding API
    api_key = os.environ["OPENWEATHERMAP_API_KEY"]
    geo_url = f"http://api.openweathermap.org/geo/1.0/zip?zip={zip_code},us&appid={api_key}"
    geo_response = requests.get(geo_url).json()

    # Check if the ZIP code was valid
    if 'lat' not in geo_response or 'lon' not in geo_response:
        raise ValueError("Invalid ZIP code")

    lat = geo_response['lat']
    lon = geo_response['lon']
    location_name = geo_response['name']

    # Get 5-day forecast in 3-hour intervals using OpenWeatherMap One Call API
    weather_url = f"http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=imperial&appid={api_key}"
    weather_response = requests.get(weather_url).json()

    forecast_list = []

    # Iterate through the forecast list and extract necessary details
    for forecast in weather_response['list']:
        forecast_dict = {
            "Time": forecast['dt_txt'][:16],  # Extract MM-DD from the datetime string
            "Temperature": forecast['main']['temp'],
            "Feels like": forecast['main']['feels_like'],
            "Weather Condition": forecast['weather'][0]['main'],
            "Precipitation Probability": forecast['pop'] * 100  # 'pop' is probability of precipitation
        }
        forecast_list.append(forecast_dict)

    return location_name, forecast_list


def forecast(zip_code):
    loc_name, forecast_list = get_weather_forecast(zip_code)
    daily_summary = compute_daily_summary(forecast_list)


    model = ChatOpenAI(model="gpt-4o-mini", temperature=0)
    parser = StrOutputParser()
    today = date.today()
    today_dotw = today.strftime("%A")

    chain = model | parser

    formatted_input = template.format(today=today, location=loc_name, dotw=today_dotw, five_day_forecast=forecast_list)

    text = chain.invoke(formatted_input)
    # print(text)
    return text


if __name__ == '__main__':
    zip_code = 30324

    fc = forecast(zip_code)
    print(fc)
