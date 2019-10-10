import redis
import json
# This function will return last 100 transactions from DB
def get_transactions():
   r = redis.Redis(host='localhost', port=6379, db=0)
   start = r.dbsize()-100
   end = r.dbsize()
   return r.mget(start, end)

def get_transactions_per_minute(minute):
   r = redis.Redis(host='localhost', port=6379, db=0)
   # one record for every 1 minute, so last 60 minutes - last 1 hr data
   start = r.llen("transaction_rate")-60
   end = r.llen("transaction_rate")
   data = r.lrange("transaction_rate", int(start),int(end))
   minn = int(minute)
   if minn == 1:
     return '{ minute: '+str(minute)+ ', counts: ' + str(data) + '}'
   length = len(data)
   print ("total length ", length) 
   i = 0
   check = 0
   sum = 0
   aggregate_list = []
   minn = int(minute)
   while i < length: 
     if check < minn:
        jdata = json.loads(data[i])
        sum = sum + int(jdata['msg_count'])       
        check = check + 1
        if i+1 == length:
            aggregate_list.append( sum );
     else:
        aggregate_list.append( sum );
        check = 0
        sum = 0
        i = i-1       
     i = i+1
   return '{ minute: '+str(minute)+ ', counts: ' + str(aggregate_list) + '}'
   

def get_high_value_addr():
   return "TO-DO, Implementation pending"
