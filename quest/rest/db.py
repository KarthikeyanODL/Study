import redis
import json
# This function will return last 100 transactions from DB
def get_transactions():
   r = redis.Redis(host='localhost', port=6379, db=0)
   start = r.llen("transactions")-100
   end = r.llen("transactions")
   data = r.lrange("transactions", start, end)  
   return data

def get_transactions_per_minute(minute):
   r = redis.Redis(host='localhost', port=6379, db=0)
   # one record for every 1 minute, so last 60 minutes - last 1 hr data
   start = r.llen("transaction_rate")-60
   end = r.llen("transaction_rate")
   data = r.lrange("transaction_rate", int(start),int(end))
   minn = int(minute)
   if minn == 1:
     return '{ minute: '+str(minute)+ ', counts: ' + str(data) + '}'
     #return data
   length = len(data)
   print ("total length ", length) 
   i = 0
   check = 0
   sum = 0
   aggregate_list = []
   minn = int(minute)
   while i < length: 
     if check < minn:
        #jdata = json.loads(data[i])
        #sum = sum + int(jdata['msg_count'])       
        sum = sum + int(data[i])
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
   #return aggregate_list
   

def get_high_value_addr():
   r = redis.Redis(host='localhost', port=6379, db=0)
   data = r.lrange("transactions", 0, -1)
   length = len(data)
   i = 0
   add_value = {}
   while i < length:
      jdata = json.loads(data[i])
      arr = jdata['x']['out']
      j = 0
      while j < len(arr):
         key = arr[j]['addr']
         value = arr[j]['value']
         if key in add_value:
            print ("Key already there , aggregate it!")
            pre_value = add_value.get(key)
            tot_value = pre_value + value
            add_value[key] = tot_value
         else: 
            add_value[key] = value
         j = j+1
      i = i+1
   return sorted(add_value.iteritems(), lambda x, y : cmp(x[1], y[1]),  reverse=True)

