# parse-docker
A docker container that runs [parse-server](https://github.com/ParsePlatform/parse-server) and [parse-dashboard](https://github.com/ParsePlatform/parse-dashboard)

## Build it

`docker build -t parse-docker .`

## Run it

`docker run -d -p 80:80 -p 443:443 -p 27017:27017 parse-docker`
