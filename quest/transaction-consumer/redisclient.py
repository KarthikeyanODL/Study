import redis
import json
import time

def save_transaction(message): 
  r = redis.Redis(host='localhost', port=6379, db=0)
  id = r.dbsize() 
  id = id + 1
  r.set(id,message)  
  print(r.expire(id,10800))
  #print(r.get(id))
  print("Transactions stored, It will be deleted after 3 hrs !!")

def rate_of_transaction(message):
  r = redis.Redis(host='localhost', port=6379, db=0)    
  r.lpush("transaction_rate",message)
  #print (r.lrange("transaction_rate",0,10))
  print ("Transaction rate per minute is stored in DB")  

