"""Test the redirect snippets with a real, isolated Nginx process.

Set NGINX_BIN to an existing nginx executable. No production server is used.
"""
import http.client
import os
from pathlib import Path
import socket
import subprocess
import tempfile
import time

binary = os.environ.get("NGINX_BIN", "nginx")
snippet = Path(__file__).resolve().parents[1] / "ops/nginx/share-watch-links.conf"
with tempfile.TemporaryDirectory(prefix="wano-nginx-pressure-") as directory:
    root = Path(directory)
    (root / "logs").mkdir()
    with socket.socket() as sock:
        sock.bind(("127.0.0.1", 0))
        port = sock.getsockname()[1]
    config = root / "nginx.conf"
    config.write_text(f'''pid logs/nginx.pid;
error_log logs/error.log;
events {{ worker_connections 128; }}
http {{ access_log off;
server {{ listen 127.0.0.1:{port}; server_name share.wanoafrica.com;
include "{snippet}";
location / {{ return 404; }}
}} }}
''')
    args = [binary, "-p", directory + "/", "-c", str(config)]
    subprocess.run(args + ["-t"], check=True)
    process = subprocess.Popen(args + ["-g", "daemon off;"], stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
    try:
        for _ in range(100):
            try:
                with socket.create_connection(("127.0.0.1", port), timeout=0.1):
                    break
            except OSError:
                time.sleep(0.02)
        low, high = "a" * 24, "B" * 24
        valid = [
            (f"/pages/feed?videoId={low}&single=true", low),
            (f"/pages/feed?single=true&videoId={low}", low),
            (f"/pages/feed?videoId={high}", high),
            (f"/pages/feed/{low}", low), (f"/pages/feed/{low}/", low),
            (f"/pages/feed/{low}?s=wa&single=true", low),
            (f"/pages/feed?videoId={low}&next=https://evil.example", low),
        ]
        invalid = [
            "/pages/feed", "/pages/feed?videoId=", "/pages/feed?videoId=short",
            "/pages/feed?videoId=" + "a" * 25, "/pages/feed?videoId=" + "g" * 24,
            "/pages/feed?videoId=https://evil.example", "/pages/feed?videoId=//evil.example",
            "/pages/feed?videoId=%2f%2fevil.example", "/pages/feed?videoId=" + low + "%0d%0aX-Evil:yes",
            "/pages/feed?videoId=" + low + ".evil", "/pages/feed/" + low + "/extra",
            "/pages/feed/" + "g" * 24, "/pages/feed/" + low + ".json",
        ]
        count = 0
        for method in ["GET", "HEAD"]:
            for path, expected in valid:
                connection = http.client.HTTPConnection("127.0.0.1", port)
                connection.request(method, path, headers={"Host": "untrusted-host.example"})
                response = connection.getresponse()
                assert response.status == 308, (method, path, response.status)
                assert response.getheader("Location") == "https://wanoafrica.com/pages/feed/" + expected
                response.read()
                connection.close()
                count += 1
            for path in invalid:
                connection = http.client.HTTPConnection("127.0.0.1", port)
                connection.request(method, path)
                response = connection.getresponse()
                assert response.status in [400, 404], (method, path, response.status)
                assert response.getheader("Location") is None, path
                response.read()
                connection.close()
                count += 1
        print(f"Nginx syntax and {count} GET/HEAD redirect cases passed.")
    finally:
        process.terminate()
        process.communicate(timeout=5)
