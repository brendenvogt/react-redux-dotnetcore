version=$1
docker build -t brendenvogt/reactreduxdotnetcore:$version ./src
docker push brendenvogt/reactreduxdotnetcore:$version
helm upgrade web charts/web --set image.tag=$version