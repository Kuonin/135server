#!/usr/bin/python3

import os

def main():
    # Headers
    print("Cache-Control: no-cache")
    print("Content-type: text/html\n")

    # Body - HTML
    print("<html>")
    print("<head><title>Python Sessions</title></head>")
    print("<body>")
    print("<h1>Python Sessions Page 2</h1>")
    print("<table>")

    if os.getenv("HTTP_COOKIE") is not None and os.getenv("HTTP_COOKIE") != "destroyed":
        print(f"<tr><td>Cookie:</td><td>{os.getenv('HTTP_COOKIE')}</td></tr>")
    else:
        print("<tr><td>Cookie:</td><td>None</td></tr>")

    print("</table>")

    # Links for other pages
    print("<br />")
    print("<a href=\"/cgi-bin/py-sessions-1.py\">Session Page 1</a>")
    print("<br />")
    print("<a href=\"/py-cgiform.html\">C CGI Form</a>")
    print("<br /><br />")

    # Destroy Cookie button
    print("<form action=\"/cgi-bin/py-destroy-session.py\" method=\"get\">")
    print("<button type=\"submit\">Destroy Session</button>")
    print("</form>")

    print("</body>")
    print("</html>")

if __name__ == "__main__":
    main()