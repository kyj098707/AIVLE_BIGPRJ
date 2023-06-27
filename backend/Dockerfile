FROM python:3.10.0

RUN apt-get update && apt-get install -y python3-pip && apt-get clean

WORKDIR /djangoproject/
ADD . /djangoproject/
RUN python -m pip install --upgrade pip

RUN pip3 install -r requirement.txt
RUN python manage.py makemigrations
