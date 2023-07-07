from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import pymysql
import configparser

config = configparser.ConfigParser()
config.read('/home/sun/airflow/dags/SECRET.conf')
DB = config['DB']
DB_URl = f"mysql+pymysql://{DB['USER']}:{DB['PASSWORD']}@{DB['HOST']}:{DB['PORT']}/{DB['NAME']}?charset=utf8mb4"
engine = create_engine(DB_URl)
session_local = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
conn = pymysql.connect(host=DB['HOST'], user=DB['USER'], passwd=DB['PASSWORD'], db=DB['NAME'], port=int(DB['PORT']), use_unicode=True, charset='utf8', cursorclass=pymysql.cursors.DictCursor)
mycursor = conn.cursor()

