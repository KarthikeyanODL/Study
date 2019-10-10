import requests


url = 'http://localhost:8888/api/sites/list'
site_list = requests.get(url).json()
print site_list
key = 19920824
url = 'http://localhost:8888/api/'+str(key)+'/sites/list'
result = requests.get(url).json()
print result

