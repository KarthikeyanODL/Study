import redis

def get_transactions():
   r = redis.Redis(host='localhost', port=6379, db=0)
   data = r.get(1)
   return data
