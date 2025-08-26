# K8s Deploy & Service Lab

- Backend: Flask (8000)
- Frontend: Express (3000, BACKEND_URL=http://backend:8000)
- Multi-container Pod: a(5000), b(5001) + Services with targetPort
- Deployments/Services for FE/BE + targetPort demo

## Quickstart (minikube)
```bash
# build images
docker build -t k8s-deploy-service-lab/backend:local ./backend
docker build -t k8s-deploy-service-lab/frontend:local ./frontend
docker build -t k8s-deploy-service-lab/a:local -f multicontainer/Dockerfile.a ./multicontainer
docker build -t k8s-deploy-service-lab/b:local -f multicontainer/Dockerfile.b ./multicontainer

# start minikube & load
minikube start --driver=docker --nodes=2
minikube image load k8s-deploy-service-lab/backend:local
minikube image load k8s-deploy-service-lab/frontend:local
minikube image load k8s-deploy-service-lab/a:local
minikube image load k8s-deploy-service-lab/b:local

# apply
kubectl apply -f k8s/01-multicontainer-pod.yaml
kubectl apply -f k8s/02-multicontainer-services.yaml
kubectl apply -f k8s/10-backend-deploy-svc.yaml
kubectl apply -f k8s/20-frontend-deploy-svc.yaml
```
