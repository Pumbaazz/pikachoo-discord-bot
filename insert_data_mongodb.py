# -*- coding: utf-8 -*-
"""
Created on Fri May 28 19:52:27 2021

@author: nguyn
"""

from pymongo import MongoClient

client = MongoClient("mongodb://tuanphung:Soundcloud1234@cluster0-shard-00-00.6dj3w.mongodb.net:27017,cluster0-shard-00-01.6dj3w.mongodb.net:27017,cluster0-shard-00-02.6dj3w.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-1b8z8g-shard-0&authSource=admin&retryWrites=true&w=majority")
db = client["pikachoo"]

col = db["girl"]

dblist = client.list_database_names()
if db.name in dblist:
  print("The database exists.")
  
collist = db.list_collection_names()
if col.name in collist:
    print("still right")


textFile = open('girl.txt','r')
lines = textFile.readlines()

count = 0
for line in lines:
    count+=1    
    col.insert_one({"id": count, "url": line.strip()})
