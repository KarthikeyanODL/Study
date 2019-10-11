from kafka import KafkaProducer
from kafka.errors import KafkaError
import json


def transaction_producer(transaction):
  producer = KafkaProducer(bootstrap_servers=['localhost:9092'])
  # produce json messages
  producer = KafkaProducer(value_serializer=lambda m: json.dumps(m).encode('ascii'))
  producer.send('transaction-topic', transaction)
  producer.flush()
  # configure multiple retries
  producer = KafkaProducer(retries=5)

def transaction_rate(msg_count):
  data = str(msg_count)
  producer = KafkaProducer(bootstrap_servers=['localhost:9092'])
  producer = KafkaProducer(value_serializer=lambda m: json.dumps(m).encode('ascii'))
  producer.send('transaction-rate', data)
  producer.flush()
  producer = KafkaProducer(retries=5)

def on_send_success(record_metadata):
  print(record_metadata.topic)
  print(record_metadata.partition)
  print(record_metadata.offset)

def on_send_error(excp):
  log.error('error!', exc_info=excp)

