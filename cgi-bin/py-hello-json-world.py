#!/usr/bin/python3

import json
import os
from datetime import datetime

print("Cache-Control: no-cache")
print("Content-Type: text/html\r\n\r\n")

date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
address = os.environ.get('REMOTE_ADDR', '')

message = {
    'title': 'Hello, Python!',
    'heading': 'Hello, Python!',
    'message': 'This page was generated with the Python programming language and Katie',
    'time': date,
    'IP': address
}

json_output = json.dumps(message)
print(json_output)