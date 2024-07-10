#!/bin/bash

rm db.sqlite3
rm -rf ./realtoraaronhuntapi/migrations
python3 manage.py makemigrations realtoraaronhuntapi
python3 manage.py migrate
# python3 manage.py loaddata users tokens
