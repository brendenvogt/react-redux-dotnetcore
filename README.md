# React Redux DotNetCore

## Setup
```
minikube start
```

```
helm install charts/web --set image.tag=$version --name web
```

## Rebuild
```
version=1.0
docker build -t brendenvogt/reactreduxdotnetcore:$version ./src
docker push brendenvogt/reactreduxdotnetcore:$version
helm upgrade web charts/web --set image.tag=$version
```

## Build script
below is an example of deploying version 0.5
```
./deploy/build_deploy.sh 0.5
```