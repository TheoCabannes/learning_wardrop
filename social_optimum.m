A = [2 1 1; 1 1 0; 1 0 1]
B = [2.25 3 3]

%{
% Test of social optimum using LP
A = [2 1 1; 1 1 0; 1 0 1]
B = [2.25 3 3]

cvx_begin
    variables h(3)
    h >= 0 
    sum(h) == 10
    minimize (h' * A * h + B * h)
cvx_end

% printing the travel time
(A * h / sum(h)) + B'
% printing the path flow
h
%}

G = [1 0.1; 2 0; 0.25 0; 2 0; 1 0.1]

%{
% test of social optimum and Nash equilibrium using intergral formulation
cvx_begin
    variables f(5)
	f(3) == f(1) - f(4) % the path flow constraint
    f(3) == f(5) - f(2) % the path flow constraint
    f(1)+f(2)==10 % the demand constraint
    f >= 0 % flow should be positive
    % social optimum
    % minimize sum(G(1:5, 1)) + (G(1:5,2)' * f)
    % nash equilibrium
    % minimize ((G(1:5, 1)' * f) + (1/2 * G(1:5,2)' * (f .* f)))
cvx_end
%}


nb_iter = 11
flow = zeros(nb_iter, 3)
tt = zeros(nb_iter, 3)
x = zeros(nb_iter, 1)
for tau=[1:nb_iter]
lambda = (tau-1) / (nb_iter-1)
x(tau) = lambda
cvx_begin
    variables f(5)
	f(3) == f(1) - f(4) % the path flow constraint
    f(3) == f(5) - f(2) % the path flow constraint
    f(1)+f(2)==10 % the demand constraint
    f >= 0 % flow should be positive
    % social optimum
    % minimize sum(G(1:5, 1)) + (G(1:5,2)' * f)
    % nash equilibrium
    % minimize ((G(1:5, 1)' * f) + (1/2 * G(1:5,2)' * (f .* f)))
    % marginal cost
    % minimize (((G(1:5, 1) + lambda * G(1:5,2))' * f) + (1/2 * G(1:5,2)' * (f .* f)))
    minimize ((G(1:5, 1)' * f) + ((1+lambda)/2 * G(1:5,2)' * (f .* f)))
cvx_end

h = [f(3) f(4) f(2)]
flow(tau, :) = h
tt(tau, :) = (A * h' / sum(h)) + B'
end

plot(x, flow)
title("The path flow as a function of lambda")
xlabel("Lambda")
ylabel("Path flow")
figure
plot(x, tt)
title("The path travel time as a function of lambda")
xlabel("Lambda")
ylabel("Path travel time")


