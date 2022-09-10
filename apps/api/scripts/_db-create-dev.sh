#!/bin/bash

su - postgres

create_db() {
    if psql -lqt | cut -d \| -f 1 | grep -qw "$1"; then
        echo "$1 db exists..."
    else
        echo "$1 db does not exist..."
        createdb -h localhost -p 5432 $1
        echo "$1 db is created..."
    fi
}

create_db "desc-dev"
create_db "desc-test"
