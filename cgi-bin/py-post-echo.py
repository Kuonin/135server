#!/usr/bin/python3
print("Cache-Control: no-cache")
print("Content-Type: text/html\r\n\r\n")

import sys
import cgi
import html

# print HTML file top
print('''<!DOCTYPE html>
<html><head><title>POST Request Echo</title>
</head><body><h1 align="center">POST Request Echo</h1>
<hr>''')

# Read in the Post data
form = cgi.FieldStorage()
form_data = form.getvalue('data', '')

# Print out the Message Body
print("<b>Message Body:</b><br />\n")
print("<ul>\n")

# Print out the Query string
loop = 0
for key in form.keys():
    loop += 1
    if loop % 2 != 0:
        value = html.escape(form.getvalue(key, ''))
        print(f"<li>{html.escape(key)} = {value}</li>\n")

print("</ul>\n")
# Print the HTML file bottom
print("</body></html>\n")