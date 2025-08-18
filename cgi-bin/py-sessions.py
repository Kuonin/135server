from http.server import HTTPServer, BaseHTTPRequestHandler 
from urllib.parse import parse_qs, urlparse 
import uuid 
import html 
 
SESSIONS = {}  # {session_id: {'name': ...}} 
 
def parse_cookies(cookie_header): 
    cookies = {} 
    if cookie_header: 
        for part in cookie_header.split(';'): 
            if '=' in part: 
                key, value = part.split('=', 1) 
                cookies[key.strip()] = value.strip() 
    return cookies 
 
class SessionHandler(BaseHTTPRequestHandler): 
    def do_GET(self): 
        path = urlparse(self.path).path 
        if path == '/': 
            self.show_page() 
        elif path == '/clear': 
            self.clear_cookies() 
 
    def do_POST(self): 
        if urlparse(self.path).path == '/': 
            self.handle_form() 
 
    def show_page(self): 
        cookies = parse_cookies(self.headers.get('Cookie', '')) 
        session_id = cookies.get('session_id') 
 
        if session_id and session_id in SESSIONS: 
            session_data = SESSIONS[session_id] 
            name = session_data['name'] 
            content = f''' 
            <!DOCTYPE html> 
            <html> 
            <head><title>Session Management Demo</title></head> 
            <body> 
                <h1>Hello, {html.escape(name)}!</h1> 
                <p>Your session is active.</p> 
                <p>Session ID: {html.escape(session_id)}</p> 
                <hr> 
                <a href="/clear">Clear Cookies</a> 
            </body> 
            </html> 
            ''' 
        else: 
            content = ''' 
            <!DOCTYPE html> 
            <html> 
            <head><title>Session Management Demo</title></head> 
            <body> 
                <h1>Welcome!</h1> 
                <p>This is a generic welcome message. Enter your name to personalize it.</p> 
                <form method="POST"> 
                    <label>Your Name: <input type="text" name="name" required></label> 
                    <button type="submit">Submit</button> 
                </form> 
            </body> 
            </html> 
            ''' 
        self.send_response(200) 
        self.send_header('Content-Type', 'text/html') 
        self.end_headers() 
        self.wfile.write(content.encode()) 
 
    def handle_form(self): 
        content_length = int(self.headers.get('Content-Length', 0)) 
        post_data = self.rfile.read(content_length).decode() 
        form_data = parse_qs(post_data) 
        name = form_data.get('name', [''])[0].strip() 
 
        session_id = str(uuid.uuid4())  # use full UUID for better entropy 
        SESSIONS[session_id] = {'name': name} 
 
        self.send_response(302) 
        self.send_header('Location', '/') 
        self.send_header('Set-Cookie', 'session_id=' + session_id + '; Path=/; HttpOnly') 
        self.end_headers() 
 
    def clear_cookies(self): 
        cookies = parse_cookies(self.headers.get('Cookie', '')) 
        session_id = cookies.get('session_id') 
        if session_id in SESSIONS: 
            del SESSIONS[session_id]   #does not handle key-error 
        self.send_response(302) 
        self.send_header('Location', '/') 
        self.send_header('Set-Cookie', 'session_id=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; HttpOnly') 
        self.end_headers() 
 
if __name__ == '__main__': 
    print("Session demo running on http://localhost:8000") 
    HTTPServer(('localhost', 8000), SessionHandler).serve_forever()