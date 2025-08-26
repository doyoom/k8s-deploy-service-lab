from flask import Flask, request
import os
app = Flask(__name__)

@app.route("/")
def i_am_b():
    print(f"[B] got {request.method} {request.path}")
    return f"hello from B (pod={os.environ.get('HOSTNAME')})\n"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
