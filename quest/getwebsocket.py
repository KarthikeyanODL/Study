import websocket
try:
    import thread
except ImportError:
    import _thread as thread
import time
import redisclient
count = 0

def on_message(ws, message):
    global count
    redisclient.save_data(str(message))
    count = count +1
   
def stopwatch(seconds):
    start = time.time()
    time.clock()
    elapsed = 0   
    while elapsed < seconds:
        elapsed = time.time() - start
        ws.send('{"op": "unconfirmed_sub"}') 
        print "loop cycle time: %f, seconds count: %02d" % (time.clock() , elapsed)
        time.sleep(1)
    minutes = ((time.time()- start)/60)
    return  minutes     
    
def on_error(ws, error):
    print(error)

def on_close(ws):
    global count
    print(count)
    print("### closed ###")

def on_open(ws):
    def run(*args):
        #while True:
        global count
        for i in range(2):            
            time.sleep(1)
            minutes = stopwatch(60)
            redisclient.rate_of_transact(minutes, count)
            count = 0
        time.sleep(1)
        ws.close()
        print("thread terminating...")
    thread.start_new_thread(run, ())


if __name__ == "__main__":
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("wss://ws.blockchain.info/inv",
                              on_message = on_message,
                              on_error = on_error,
                              on_close = on_close)
    ws.on_open = on_open
    ws.run_forever()
