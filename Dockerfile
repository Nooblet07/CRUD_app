FROM postgres:latest

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=docker
ENV POSTGRE_DB=inventory

EXPOSE 5432