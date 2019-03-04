import json
import BaseHTTPServer
import SimpleHTTPServer

class MyHTTPRequestHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)

        print post_data

        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write('hello')

def run():
    httpd = BaseHTTPServer.HTTPServer(('', 8000), MyHTTPRequestHandler)
    print 'localhost:8000'
    httpd.serve_forever()

if __name__ == "__main__":
    run()
