#!/usr/bin/python3
print("Cache-Control: no-cache")
print("Content-Type: text/html\r\n\r\n")

from http.cookies import SimpleCookie
from flask import Flask, request, make_response

app = Flask(__name__)

@app.route('/py-destroy-session.py')
def destroy_session():
    cookie = SimpleCookie(request.headers.get('Cookie'))
    sid = cookie.get('SITE_SID') or request.args.get('sid')
    
    response = make_response("<html>"
                             "<head>"
                             "<title>Python Session Destroyed</title>"
                             "</head>"
                             "<body>"
                             "<h1>Session Destroyed</h1>"
                             "<a href=\"/py-cgiform.html\">Back to the Perl CGI Form</a><br />"
                             "<a href=\"/cgi-bin/py-sessions-1.py\">Back to Page 1</a><br />"
                             "<a href=\"/cgi-bin/py-sessions-2.py\">Back to Page 2</a>"
                             "</body>"
                             "</html>")
    
    # Here you would typically delete the session from your session store
    # For example: session_store.delete(sid)
    
    return response

if __name__ == '__main__':
    app.run()