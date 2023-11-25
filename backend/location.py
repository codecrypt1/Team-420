import requests
from dotenv import load_dotenv
load_dotenv()
import os
from firebase_utils import push_to_firebase
def get_coordinates(location):
    try:
        # Make a GET request to the Google Geocode API to retrieve the coordinates for the given address
        response = requests.get('https://maps.googleapis.com/maps/api/geocode/json', params={
            'address': f'{location}, Kerala, India',
            'key':  os.environ["MAPS_API_KEY"] ,  # Replace 'YOUR_API_KEY_HERE' with your actual API key
        })

        # Check if the response contains results and geometry information
        if response.status_code == 200:
            data = response.json()
            if data.get('results') and len(data['results']) > 0:
                location = data['results'][0]['geometry']['location']
                # Return the coordinates as a dictionary
                return location
            else:
                raise Exception('Invalid response or no results found.')
        else:
            response.raise_for_status()  # Raise an HTTPError for bad responses

    except Exception as e:
        print(e)
        raise Exception('Failed to retrieve coordinates.')

# # Example usage:
# location = "Cusat kochi"
# coordinates = get_coordinates(location)
# print(f"Coordinates: {coordinates}")

# push_to_firebase({"location":location,"coordinates":coordinates,"unique_id":"89272829"})
