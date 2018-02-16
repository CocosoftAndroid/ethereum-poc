
from ethjsonrpc import EthJsonRpc
from eth_utils import add_0x_prefix
import RPi.GPIO as GPIO
import time
import requests
import json


stationID=123
result=False 

GPIO.setmode(GPIO.BOARD)
GPIO.setup(7, GPIO.OUT) #GPIO - 68
c = EthJsonRpc('35.170.199.205' ,8545)
account_to_watch = '0x705db02bfa6eb39c011ef8bfcc11e80d75bf7fdb'
call_time = int(time.time());
onStatus=False
print stationID
details = c.call(account_to_watch,'getStation(uint256)',[stationID],['uint256','string','uint256','uint256','uint256'])
print details;

while True:
    
    r = c.call(add_0x_prefix(account_to_watch), 'getStationState(uint256)',[stationID], ['uint256'])
    #r = str(r.text)
    #result = json.loads(r)
    call_time = int(time.time());
    print call_time
    print r[0]
    if call_time < r[0]:
        result = True
    else:
        result = False
    print result

    if (onStatus==False):
        print onStatus 
	if(result==True):
            print "Switch ON"
            onStatus=True
            GPIO.output(7, True)
    elif (onStatus==True):
        if(result==False):
            print "Switch OFF"
            onStatus=False
            GPIO.output(7, False)

    time.sleep(2)
