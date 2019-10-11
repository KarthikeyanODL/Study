import websocket
try:
    import thread
except ImportError:
    import _thread as thread
import time
import kafka_producer
msg_count = 0

def on_message(ws, message):
    print(message)
    kafka_producer.transaction_producer(message)
    global msg_count
    msg_count = msg_count + 1

def on_error(ws, error):
    print(error)

def on_close(ws):
    print("### closed ###")

def on_open(ws):
    def run(*args):
        while True:
           # run the timer for 60 secounds to calculate transaction_rate
           endtime = time.time() + 60
           while time.time() < endtime:
             time.sleep(1)
             ws.send('{"op": "unconfirmed_sub"}')
           global msg_count
           # every minute calculate transaction_rate and produce it to kafka
           kafka_producer.transaction_rate(msg_count)
           msg_count = 0
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
