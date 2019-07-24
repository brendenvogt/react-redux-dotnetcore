FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build-env
WORKDIR /source

RUN curl -sL https://deb.nodesource.com/setup_10.x |  bash -
RUN apt-get install -y nodejs

COPY ./*.csproj ./
RUN dotnet restore

COPY ./ ./
RUN dotnet publish "./src.csproj" -c Release -o "./dist" 

FROM mcr.microsoft.com/dotnet/core/aspnet:2.2
WORKDIR /app
COPY --from=build-env /source/dist .

EXPOSE 80
ENTRYPOINT ["dotnet", "src.dll"]