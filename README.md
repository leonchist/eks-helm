# Kubernetes assignment

A script or verbal document that satisfies the functional requirements:
- A script should setup the required environment (GitHub repo or a zip file, both works)
- A document should describe the paths chosen and abandoned

# Requirements
For this assignment please use this docker image, mendhak/http-https-echo for a simple echo
server. The echo server will simulate our app.

for more info about mendhak/http-https-echo
https://code.mendhak.com/docker-http-https-echo/

Bring a Kubernetes cluster to the following state:
  - The cluster should have an ingress (TLS is not required for the test)
  - Create a Helm chart for mendhak/http-https-echo including:
    - Health check (liveness)
    - Memory limit and CPU (should be as a variable)
    - Connect the pod to a service that can be reached from the cluster.
  - Define monitoring for the cluster:
    ○ Provide a way to monitor cluster's system metrics ( cpu, mem, number of pods,
etc) in Grafana or any other alternative tool
    ○ If the liveness fails we want to get a notification about that.
    
# Comments
- Use any micro Kubernetes that works for you and gets you to the desired state ○ You can use
k0s, microk8s, k3s or any easily installable cluster
- You can use whatever automation framework you wish to get things to the desired state, as
long that these tools are open / free sourced and the process of using them is reproducible
- Plan what needs to be done and don’t overwork the solution
- If you prefer, write down a step-by-step description of what to do in order to get the
environment up and running, and how to make sure it work

# Solution
Follow the document: https://docs.google.com/document/d/1bfJIlbUShVt3wPaMev_H6lKe0p0X7ofJqvFP8VVcEl0/edit?usp=sharing
