#!/usr/bin/python3
print("Cache-Control: no-cache")
print("Content-Type: text/html\r\n\r\n")

import os
import sys

# print HTML file top
print("""<!DOCTYPE html>
<html><head><title>General Request Echo</title>
</head><body><h1 align="center">General Request Echo</h1>
<hr>""")

# HTTP Protocol, HTTP Method, and the Query String are all environment variables
print(f"<p><b>HTTP Protocol:</b> {os.environ.get('SERVER_PROTOCOL')}</p>")
print(f"<p><b>HTTP Method:</b> {os.environ.get('REQUEST_METHOD')}</p>")
print(f"<p><b>Query String:</b> {os.environ.get('QUERY_STRING')}</p>")

# Reading from standard input
content_length = int(os.environ.get('CONTENT_LENGTH', 0))
form_data = sys.stdin.read(content_length)

print(f"<p><b>Message Body:</b> {form_data}</p>")

# Print the HTML file bottom
print("</body></html>")