#!/usr/bin/python3

import os

def main():
    # Headers
    print("Cache-Control: no-cache")

    # Get Name from Environment
    username = input()

    # Check to see if a proper name was sent
    name = ""
    if username[0] == 'u':
        name = username[9:]

    # Set the cookie using a header, add extra \n to end headers
    if len(name) > 0:
        print("Content-type: text/html")
        print(f"Set-Cookie: {name}\n")
    else:
        print("Content-type: text/html\n")

    # Body - HTML
    print("<html>")
    print("<head><title>C Sessions</title></head>")
    print("<body>")
    print("<h1>C Sessions Page 1</h1>")
    print("<table>")

    # First check for new Cookie, then Check for old Cookie
    if len(name) > 0:
        print(f"<tr><td>Cookie:</td><td>{name}</td></tr>")
    elif os.getenv("HTTP_COOKIE") is not None and os.getenv("HTTP_COOKIE") != "destroyed":
        print(f"<tr><td>Cookie:</td><td>{os.getenv('HTTP_COOKIE')}</td></tr>")
    else:
        print("<tr><td>Cookie:</td><td>None</td></tr>")

    print("</table>")

    # Links for other pages
    print("<br />")
    print("<a href=\"/cgi-bin/c-sessions-2.cgi\">Session Page 2</a>")
    print("<br />")
    print("<a href=\"/c-cgiform.html\">C CGI Form</a>")
    print("<br /><br />")

    # Destroy Cookie button
    print("<form action=\"/cgi-bin/c-destroy-session.cgi\" method=\"get\">")
    print("<button type=\"submit\">Destroy Session</button>")
    print("</form>")

    print("</body>")
    print("</html>")

if __name__ == "__main__":
    main()
