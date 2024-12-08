FROM postgres:13

ENV POSTGRES_DB=mydatabase
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword

COPY init /docker-entrypoint-initdb.d/


# docker build -t custom_postgres_image .
#docker run -d -p 5445:5432 --name my_postgres_container custom_postgres_image
