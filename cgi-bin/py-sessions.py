#!/usr/bin/python3

import http.cookies
import datetime
import random

expiration = datetime.datetime.now() + datetime.timedelta(days=30)
cookie = http.cookies.SimpleCookie()
cookie["session"] = random.randint(1, 10000)
cookie["session"]["domain"] = ".katiel.site"
cookie["session"]["path"] = "/"
cookie["session"]["expires"] = \
  expiration.strftime("%a, %d-%b-%Y %H:%M:%S PST")

print("Cache-Control: no-cache")
print("Content-Type: text/plain\r\n\r\n")

print("Cookie set with: ", cookie.output)
