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
# Get the current URL which includes the Query String
url = os.environ["REQUEST_URI"]

# Parse the URL into its subcomponents
parsed = ulp.urlparse(url)

# Parse the Query String portion of the URL;
# this returns a dictionary of 'key:value' pairs,
# with 'key' being the name of the input in the HTML form,
# and 'value' being a list which contains what was
# entered by the user as that input in the same HTML form
dic = ulp.parse_qs(parsed.query, keep_blank_values=True)


# Print out the Message Body
print("<b>Message Body:</b><br />\n")
print("<ul>\n")

# Print out the Query string
loop = 0
for key in dic.keys():
    loop += 1
    if loop % 2 != 0:
        value = html.escape(dic.getvalue(key, ''))
        print(f"<li>{html.escape(key)} = {value}</li>\n")

print("</ul>\n")
# Print the HTML file bottom
print("</body></html>\n")