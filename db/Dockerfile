FROM mysql:latest

# will need to move into a secrets 
ENV   MYSQL_ROOT_PASSWORD=password1234!
ENV   MYSQL_ROOT_USER=root

COPY ./init.sql /docker-entrypoint-initdb.d/