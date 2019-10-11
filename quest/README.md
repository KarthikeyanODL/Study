# Step 1: Environment setup
cd ~/Study/quest
./env_setup.sh

# Step 2: install librabries
sudo apt install python-pip
pip install redis
pip install kafka-python
pip install websocket-client
pip install -r ~/Study/quest/rest/requirements.txt

# Step 3: run kafka, zookeeper and redis containers
docker-compose -f kafka-redis-dockercompose.yml up -d


# Step 4: start kafka consumer - open another terminal
cd /transaction-consumer
python kafka_consumer.py
<< 
Explanation: 
it will keep listen on the topics, 
when producer provide transaction data on the topic, It will save the transaction data in db. 
It also set expiry for the Data - 3hs. 

>>

 
# Step 5: start kafka producer (This is infinite loop) - open another terminal
cd /transaction-producer
python get_websocket.py
<<
Explanation:
it will get the websocket transaction message continuesly and publish on the topic. 
(Infinite while loop)
>>


# Step 6: restful webservice - open another terminal
python app.py

Display latest 100 transactions
> curl http://localhost:3330/show_transactions/

Display number of transactions per minute for the last hour
> curl http://localhost:3330/transactions_count_per_minute/1

Display the bitcoin addresses which has the most aggregate value in transactions in the last 3 hours.
> curl http://localhost:3330/high_value_addr

<<
Explanation:
this will start python restfulwebservice on flask server.
run the above curl to test or you can use POSTman rest client 
>>
