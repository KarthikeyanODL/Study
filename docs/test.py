import gevent
#import random
import requests
from random import randrange
from PIL import Image
from io import BytesIO
import datetime


def get_random_camera_id(pid):
    url = 'http://localhost:3030/url'

    camera_list = requests.get(url).json()
    camera_id = camera_list[randrange(len(camera_list))][1]

    gevent.sleep(1)
    print('Task %s done' % pid)
    get_prev_image(camera_id)

def get_prev_image(c_id):
    timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S") + ".000"
    payload = {'id': str(c_id), 'timestamp': timestamp, 'asset_class': 'pre'}
    cookies = {'auth_key': '17ab96bd8ffbe8ca58a78657a918558'}
    #  params=payload
    res = requests.get()
    image = Image.open(BytesIO(r.content))
    image.save()
    print payload



def asynchronous():
    threads = [gevent.spawn(get_random_camera_id, i) for i in xrange(5)]
    gevent.joinall(threads)


print('Asynchronous:')
asynchronous()
