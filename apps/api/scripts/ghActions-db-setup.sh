#!/bin/bash

su - postgres
createdb -h localhost -p 5432 desc-test
[ $? -eq 0 ] && echo "desc-test db is setup..." || echo "desc-text db is not created"