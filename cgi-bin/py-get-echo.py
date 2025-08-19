#!/usr/bin/python3
print("Cache-Control: no-cache")
print("Content-Type: text/html\r\n\r\n")

# print HTML file top
print("""
<!DOCTYPE html>
<html><head><title>GET Request Echo</title>
</head><body><h1 align="center">Get Request Echo</h1>
<hr>
""")

import os
import urllib.parse

# The Query String is simply an environment variable
print(f"<b>Raw Query String:</b> {os.environ.get('QUERY_STRING', '')}<br />\n")

query_string = os.environ.get('QUERY_STRING', '')
in_dict = {}

if len(query_string) > 0:
    pairs = query_string.split('&')
    for pair in pairs:
        name, value = pair.split('=')
        value = urllib.parse.unquote(value)
        in_dict[name] = value

# Print out the Query String
print("<b>Parsed Query: </b>")
print("<ul>")
for key in in_dict:
    print(f"<li>{key} = {in_dict[key]}</li>\n")
print("</ul>")

# Print the HTML file bottom
print("</body></html>")