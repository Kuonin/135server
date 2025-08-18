#!/usr/bin/python3
print("Cache-Control: no-cache")
print("Content-Type: text/html\r\n\r\n")

from http.cookies import SimpleCookie
from flask import Flask, session, redirect, url_for, request, render_template_string

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Set a secret key for session management

@app.route('/py-sessions-2.py')
def session_page_2():
    name = session.get('username', None)

    html_content = f"""
    <html>
    <head>
    <title>Python Sessions</title>
    </head>
    <body>
    <h1>Python Sessions Page 2</h1>
    <p><b>Name:</b> {name if name else 'You do not have a name set'}</p>
    <br/><br/>
    <a href="/py-sessions-1.py">Session Page 1</a><br/>
    <a href="/py-cgiform.html">Python CGI Form</a><br />
    <form style="margin-top:30px" action="/py-destroy-session.py" method="get">
    <button type="submit">Destroy Session</button>
    </form>
    </body>
    </html>
    """
    return render_template_string(html_content)

@app.route('/py-destroy-session.py', methods=['GET'])
def destroy_session():
    session.clear()  # Clear the session
    return redirect(url_for('session_page_2'))

if __name__ == '__main__':
    app.run()