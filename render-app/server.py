# server.py

from flask import Flask
import json
import time
import csv
import os.path
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app
	# , resources={r"/api/*": {"origins": "*"}}
	)

def load_header(value):
	dictionary = {}
	for i in value:
		dictionary[i] = []

	return dictionary, len(value), value

def load_data(filename, getMax = False):

	while not os.path.isfile(filename):
		print(filename, " not found")
		time.sleep(40)

	with open(filename, 'r') as f:
	    csv_reader = csv.reader(f, delimiter=',')
	    values, size, keyList = load_header(next(csv_reader))
	    
	    maximum = float(-5000)
	    j = 0;
	    for row in (csv_reader):
	    	for i in range(size):
	    		if (float(row[i]) > maximum):
	    			maximum = float(row[i])
	    		values[keyList[i]].append({"x": j, "y": float(row[i])})
	    	j += 1;

	return values, maximum 


@app.route("/flow_data")
def flow_data():
	flow_data, maximum = load_data("flow_data.csv", True)

	value = json.dumps({
		"flow_data": flow_data,
		"maximum": maximum
		})

	return value

@app.route("/path_choice")
def path_choice():

	choice_data, _ = load_data("path_choice.csv")

	value = json.dumps({
		"path_choice": choice_data
		})

	return value

if __name__ == "__main__":
	app.run(debug=True, port = 5000)