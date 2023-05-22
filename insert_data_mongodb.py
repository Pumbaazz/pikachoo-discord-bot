# -*- coding: utf-8 -*-
"""
Created on Fri May 28 19:52:27 2021

@author: nguyn
"""

from pymongo import MongoClient
cnnString = "mongodb+srv://tuanphung:Phantasielos1@pikachoo.tzoynmr.mongodb.net/"
client = MongoClient(cnnString)
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
