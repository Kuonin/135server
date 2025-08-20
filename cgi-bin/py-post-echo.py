#!/usr/bin/python3
print("Cache-Control: no-cache")
print("Content-Type: text/html\r\n\r\n")

import sys
import html
import os
import urllib.parse as ulp

# print HTML file top
print('''<!DOCTYPE html>
<html><head><title>POST Request Echo</title>
</head><body><h1 align="center">POST Request Echo</h1>
<hr>''')

# Read in the Post data
try:
    url = input()
except:
    url = ''

# Print out the Message Body
print("<b>Message Body:</b><br />\n")
print(url)

# Print the HTML file bottom
print("</body></html>\n")