import redis
import json
import time

def save_transaction(message): 
  r = redis.Redis(host='localhost', port=6379, db=0)
  id = r.dbsize() 
  id = id + 1
  r.lpush("transactions",message)  
  print(r.expire("transactions",10800))
  print("Transactions consumed and  stored in DB, It will be deleted after 3 hrs !!")

def rate_of_transaction(message):
  r = redis.Redis(host='localhost', port=6379, db=0)    
  r.lpush("transaction_rate",message)
  print ("Transaction rate per minute is stored in DB")  

