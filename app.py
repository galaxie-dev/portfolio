import http.server
import socketserver
import json
import urllib.parse
from db_handler import DatabaseHandler
import os
from pathlib import Path

db = DatabaseHandler()

class RequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api/messages':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            messages = db.get_all_messages()
            self.wfile.write(json.dumps(messages).encode())
        else:
            return http.server.SimpleHTTPRequestHandler.do_GET(self)

    def do_POST(self):
        if self.path == '/api/submit':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length).decode('utf-8')
            form_data = urllib.parse.parse_qs(post_data)
            
            name = form_data.get('name', [''])[0]
            email = form_data.get('email', [''])[0]
            message = form_data.get('message', [''])[0]
            
            if name and email and message:
                db.save_message(name, email, message)
                response = {'success': True, 'message': 'Message sent successfully!'}
            else:
                response = {'success': False, 'message': 'All fields are required!'}
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())
        
        elif self.path == '/api/delete':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length).decode('utf-8')
            data = json.loads(post_data)
            
            message_id = data.get('id')
            if message_id and db.delete_message(message_id):
                response = {'success': True, 'message': 'Message deleted successfully!'}
            else:
                response = {'success': False, 'message': 'Failed to delete message!'}
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())

def run_server(port=8000):
    with socketserver.TCPServer(("", port), RequestHandler) as httpd:
        print(f"Server running at http://localhost:{port}")
        httpd.serve_forever()

if __name__ == '__main__':
    run_server()
