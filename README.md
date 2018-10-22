# Emergent Communication of Autonomous Vehicles in routing
## Motivation
The main motivation of this problem is to understand how AI communicate and what communication can emerge between AV’s under cooperative scenarios. We want to see if AI’s can use this communication to perform actions that are more socially aware than humans. 

## Problem statement
We are seeking to understand how communication emerges between autonomous vehicles, in routing games. Specifically, we are considering:

1. a traffic network with only one origin and one destination linked with three paths. Where paths travel times depend on the flow on each path. See figure 1.
2. autonomous vehicles (AVs) that choice their path route between the origin to the destination. Their path choices determine the flow on each path which impacts the path travel time.
3. AVs want to minimize their own travel time. They have no knowledge on the current state. But considering that this game is repeated every day; AVs only know travel times they have from previous days.
4. AVs learn their path choice sharing a model.
5. One-to-one message broadcasted from AVs to AVs are inputs and outputs of the neural network.
6. AVs want to minimize their own travel time.

## References
- Emergence of Grounded Compositional Language in Multi-Agent Population, I.Mordatch
- Multiagent reinforcement learning in the Iterated Prisoner’s Dilemma, T.Sandholm
- On the convergence of no-regret learning in selfish routing, W. Krichene
- The Traffic Assignment Problem - Models and Methods, M.Patriksson
- Algorithmic game theory, Chapter 18, T.Roughgarden
