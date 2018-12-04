# Social Routing Interfaces


class Network(object): 
	"""
	Parent class for all networks. 

	Networks are used to store the flows of the paths
	in our env. This will be used by the Social Routing 
	environment to calculate path times and marginal costs. 

	Current Available Networks
	1. Braess's Network
	2. Triangular Network (need another name)


	INCLUDE BRIEF DESCRIPTION OF EACH FUNCTION IN CLASS. 
	"""

	def __init__(self, network_name, num_veh):
		"""
		Arguments:
		1. network_name: A string that specifies the name of the network we want to build. 
		2. num_veh: An integer representing the # of vehicles to be included in this network. 
		"""
		raise NotImplementedError 

	def nb_paths(self):
		"""
		Gives the number of paths within this network. 

		Returns: An integer representing number of paths
		"""
		raise NotImplementedError 

	def travel_time(self, path_id):
		"""
		Matches path_id to a path in this network and calculates the travel time 
		along that path. This function assumes that the flows in the network are up-to-date.


		Arguments:
		1. path_id: An integer representing the id of a path in this network. 

		Returns: A float representing travel time of path_id
		"""
		raise NotImplementedError

	def marginal_cost(self, path_id):
		"""
		Matches path_id to a path in this network and calculate the marginal cost of adding
		one vehicle to the path specified in path_id. The marginal cost is interpreted as 
		the amount of travel time added by the addition of another vehicle along the path. 


		Arguments: 
		1. path_id: An integer representing the id of a path in this network. 

		Returns: A float representing travel time of path_id
		"""
		raise NotImplementedError

	def apply_flow(self, flows):
		"""
		Applies a set of flows to individual paths in the network. This class should always keep
		track of the amount of flow on each *road* on the network.
	

		Arguments:
		1. flows: A dictionary mapping a path_id (as the key) to an integer representing the number 

		Returns: Nothing

		**Note: This function should raise an error if any of the values in the dictionary isn't
				 an integer!
		"""
		raise NotImplementedError

	def 