
# coding: utf-8

# # The network class

# In[19]:


import numpy as np


# In[20]:


class network:
    """
    This class store the network characteristic.
    """
    def __init__(self, network_name, nb_veh):
        """
        load the network which correspond to the network_name
        define the nb_veh as the nb_veh
        """
        if network_name == "Braess":
            self.__graph = np.array([[0, 0, 1, 1, 0.1, 0, 0, 0],
                              [1, 0, 2, 2, 0, 0, 0, 0],
                              [2, 1, 2, 0.25, 0, 0, 0, 0],
                              [3, 1, 3, 2, 0, 0, 0, 0],
                              [4, 2, 3, 1, 0.1, 0, 0, 0]])
            self.__delta = np.array([[1,0,1,0,1],
                                     [1,0,0,1,0],
                                     [0,1,0,0,1]])
            self.__flow_per_veh = 10 / nb_veh
            
            """
            from nb_veh and the intern demand define the number of flow that each veh represent
            also define __nb_paths to give it to the Env
            """
            
        else:
            raise Exception("The network name is not known! The only options are: \'Braess\'. This error was raise in the instancation of the class network")
        
    def __travel_time(self, f):
        f = f * self.__flow_per_veh
        g = self.__graph
        return g[:,3] + g[:,4]*f + g[:,5]*(f**2) + g[:,6]*(f**3) + g[:,7]*(f**4)
    
    def __marginal_cost(self, f):
        f = f * self.__flow_per_veh
        g = self.__graph
        return g[:,4]*f + 2*g[:,5]*(f**2) + 3*g[:,6]*(f**3) + 4*g[:,7]*(f**4)
    
    @property
    def nb_paths(self):
        return self.__delta.shape[0]
    
    def update_flow_from_dict(self, paths_flow_dict):
        self.__path_flow = np.zeros(self.__delta.shape[0])
        for p in paths_flow_dict.keys():
            assert type(p) == int and p > -1 and p < self.nb_paths
            self.__path_flow[p] = paths_flow_dict[p]
        self.__update_travel_time_and_marginal_cost()
        
    def __update_travel_time_and_marginal_cost(self):
        f = self.__delta.T @ self.__path_flow
        tt_f = self.__travel_time(f)
        mc_f = self.__marginal_cost(f)
        self.__path_travel_time = self.__delta @ tt_f
        self.__path_marginal_cost = self.__delta @ mc_f
        
    def travel_time(self, p):
        assert type(p) == int and p > -1 and p < self.nb_paths
        return self.__path_travel_time[p]

    # marginal_cost = d[t(x_e)]/d[x_e]
    def marginal_cost(self, p):
        assert type(p) == int and p > -1 and p < self.nb_paths
        return self.__path_marginal_cost[p]
    


# In[23]:


def Test_Braess():
    net = network("Braess", 4)

    print("---- TESTING ----")
    print("The Nash case")
    net.update_flow_from_dict({0:2,1:1,2:1})
    assert([net.travel_time(i) for i in range(3)] == [3.75, 3.75, 3.75])
    assert([net.marginal_cost(i) for i in range(3)] == [1.5, 0.75, 0.75])
    print([net.travel_time(i) for i in range(3)])
    print([net.marginal_cost(i) for i in range(3)])

    print("The social optimum case")
    net.update_flow_from_dict({0:0,1:2,2:2})
    assert([net.travel_time(i) for i in range(3)] == [3.25, 3.5, 3.5])
    assert([net.marginal_cost(i) for i in range(3)] == [1.0, 0.5, 0.5])
    print([net.travel_time(i) for i in range(3)])
    print([net.marginal_cost(i) for i in range(3)])

