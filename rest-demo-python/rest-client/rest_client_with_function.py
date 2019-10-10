import requests


def get_sites():
    url = 'http://localhost:8888/api/sites/list'
    site_list = requests.get(url).json()
    print site_list

def get_sites_by_key(key):
    url = 'http://localhost:8888/api/'+str(key)+'/sites/list'
    result = requests.get(url).json()
    print result


get_sites();
apikey= 19920824;
get_sites_by_key(apikey);


