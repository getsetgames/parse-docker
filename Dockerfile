FROM ubuntu

RUN apt-get update \
 && apt-get install -y curl mongodb supervisor openssl \
 && curl -sL https://deb.nodesource.com/setup_6.x | bash - \
 && apt-get install -y nodejs \
 && ln /usr/bin/node /usr/local/bin/node

RUN mkdir -p mongodb/dbpath
 
ADD supervisord.conf /etc/supervisor/conf.d/supervisord.conf

WORKDIR /parse
ADD . /parse
RUN npm install \
 && npm cache clear \
 && rm -rf ~/.npm \
 && rm -rf /var/lib/apt/lists/*

RUN ./generate-cert.sh

EXPOSE 9000 27017

ENTRYPOINT ["/usr/bin/supervisord"]