import redis

# This function will return last 100 transactions from DB
def get_transactions():
   r = redis.Redis(host='localhost', port=6379, db=0)
   start = r.dbsize()-100
   end = r.dbsize()
   return r.mget(start, end)

def get_transactions_per_minute(minute):
   return "TO-DO, Implementation pending"

def get_high_value_addr():
   return "TO-DO, Implementation pending"
