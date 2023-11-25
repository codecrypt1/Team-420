import firebase_admin
from firebase_admin import db


cred_obj = firebase_admin.credentials.Certificate('./cred_firebase.json')
default_app = firebase_admin.initialize_app(cred_obj, {
	'databaseURL':"https://tech-f1c2a-default-rtdb.firebaseio.com"
	})


def push_to_firebase(params: dict):
    ref = db.reference("/orders")
    ref.child(params['unique_id']).set(params)


