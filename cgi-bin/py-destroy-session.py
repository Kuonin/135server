#!/usr/bin/python3

def main(argc, argv, envp):
    # Headers
    print("Cache-Control: no-cache")
    print("Set-Cookie: destroyed")
    print("Content-type: text/html\n")

    # Body - HTML
    print("<html>")
    print("<head><title>Python Session Destroyed</title></head>")
    print("<body>")
    print("<h1>Python Session Destroyed</h1>")

    # Links
    print("<a href=\"/cgi-bin/py-sessions-1.py\">Back to Page 1</a>")
    print("<br />")
    print("<a href=\"/cgi-bin/py-sessions-2.py\">Back to Page 2</a>")
    print("<br />")
    print("<a href=\"/py-cgiform.html\">Python CGI Form</a>")

    print("</body>")
    print("</html>")

    return 0

if __name__ == "__main__":
    import sys
    main(len(sys.argv), sys.argv, None)