#!/usr/bin/python3

import os
from datetime import datetime

print("Cache-Control: no-cache\n")
print("Content-type: text/html\n\n")
print("<html>")
print("<head>")
print("<title>Hello, Perl!</title>")
print("</head>")
print("<body>")

print("<h1>Katie was here - Hello, Perl!</h1>")
print("<p>This page was generated with the Perl programming langauge</p>")

date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
print(f"<p>Current Time: {date}</p>")

# IP Address is an environment variable when using CGI
address = os.environ.get('REMOTE_ADDR', 'Unknown')
print(f"<p>Your IP Address: {address}</p>")

print("</body>")
print("</html>")