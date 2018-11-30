import csv
import os.path

class CSVGenerator:

	def __init__(self, path_choice_filename, flow_filename):
		self.pathChoiceCsv = open(path_choice_filename, 'a')
		self.pathChoiceHeader = True
		
		self.flowDataCSV = open(flow_filename, 'a')
		self.flowDataHeader = True

	def writePathChoice(self, path_choice):
		fieldnames = []
		for key in path_choice.keys():
			fieldnames.append(key)

		writer = csv.DictWriter(self.pathChoiceCsv, fieldnames=fieldnames, lineterminator = '\n')

		# print("pathchoice header = ", self.pathChoiceHeader)
		if self.pathChoiceHeader:
			# print("Writing path choice header")
			writer.writeheader()
			self.pathChoiceHeader = False
		
		writer.writerow(path_choice)

	def writeFlowData(self, flow_data):

		fieldnames = []
		for key in flow_data.keys():
			fieldnames.append(key)

		writer = csv.DictWriter(self.flowDataCSV, delimiter=',', fieldnames=fieldnames, lineterminator = '\n')
		
		if self.flowDataHeader:
			writer.writeheader()
			self.flowDataHeader = False

		writer.writerow(flow_data)

	def generateCSV(self, path_choice, flow_data):
		self.writePathChoice(path_choice)
		self.writeFlowData(flow_data)

def main():

	path_choice_filename = 'path_choice.csv'
	flow_filename = 'flow_data.csv'
	wr = CSVGenerator(path_choice_filename, flow_filename)

	wr.generateCSV({"A": 0, "B": 2, "C": 2, "D": 1}, {"path_a": 3.00, "path_b": 2.00, "path_c": 2.75})
	wr.generateCSV({"A": 0, "B": 2, "C": 0, "D": 2}, {"path_a": 4.00, "path_b": 4.00, "path_c": 4.75})
	wr.generateCSV({"A": 0, "B": 0, "C": 1, "D": 2}, {"path_a": 3.50, "path_b": 3.75, "path_c": 3.00})
	wr.generateCSV({"A": 0, "B": 2, "C": 1, "D": 0}, {"path_a": 3.25, "path_b": 4.25, "path_c": 4.00})
	wr.generateCSV({"A": 0, "B": 1, "C": 2, "D": 2}, {"path_a": 2.55, "path_b": 2.00, "path_c": 2.75})


if __name__ == "__main__":
	main()
