openssl genrsa -des3 -passout pass:x -out server.pass.key 2048
openssl rsa -passin pass:x -in server.pass.key -out server.key
rm server.pass.key
openssl req -new -key server.key -out server.csr -subj "/C=US/ST=State/L=City/O=Org/OU=Unit/CN=example.com"
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
rm server.csr
