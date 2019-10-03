import redis

index = 0
rate_index = 0

def save_data(message):
 global index 
 index = index+1
 r = redis.Redis(host='localhost', port=6379, db=0)
 r.set(index, message)
 print(index)

def rate_of_transact(minute, counts):
 global rate_index
 rate_index = rate_index+1
 r = redis.Redis(host='localhost', port=6379, db=0)
 r.hset("rate"+str(rate_index), minute, counts) 

#def get_data():
# r = redis.Redis(host='localhost', port=6379, db=0)
# print(r.hget("rate2"))

#get_data()
