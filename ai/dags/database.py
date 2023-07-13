from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import pymysql 
import configparser

config = configparser.ConfigParser()
config.read('/home/ubuntu/airflow/dags/SECRET.conf')
DB = config['DB']

Base = declarative_base()

