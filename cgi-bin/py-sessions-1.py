#!/usr/bin/python3
print("Cache-Control: no-cache")
print("Content-Type: text/html\r\n\r\n")

from http.cookies import SimpleCookie
from flask import Flask, request, make_response, render_template_string

app = Flask(__name__)

@app.route('/py-sessions-1.py', methods=['GET', 'POST'])
def perl_sessions_1():
    # Create a new session
    session_id = request.cookies.get('CGISESSID')
    if not session_id:
        session_id = 'new_session_id'  # Placeholder for session ID generation
        response = make_response(render_template_string(html_template(session_id, None)))
        response.set_cookie('CGISESSID', session_id)
        return response

    name = request.args.get('username') or request.cookies.get('username')
    if name:
        response = make_response(render_template_string(html_template(session_id, name)))
    else:
        response = make_response(render_template_string(html_template(session_id, None)))

    response.set_cookie('username', name)
    return response

def html_template(session_id, name):
    return f"""
    <html>
    <head>
        <title>Python Sessions</title>
    </head>
    <body>
        <h1>Python Sessions Page 1</h1>
        <p><b>Name:</b> {name if name else 'You do not have a name set'}</p>
        <br/><br/>
        <a href="/cgi-bin/py-sessions-2.py">Session Page 2</a><br/>
        <a href="/py-cgiform.html">Python CGI Form</a><br />
        <form style="margin-top:30px" action="/cgi-bin/py-destroy-session.py" method="get">
            <button type="submit">Destroy Session</button>
        </form>
    </body>
    </html>
    """

if __name__ == '__main__':
    app.run()