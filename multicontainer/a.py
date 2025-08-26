from flask import Flask, request
import os
app = Flask(__name__)

@app.route("/")
def i_am_a():
    print(f"[A] got {request.method} {request.path}")
    return f"hello from A (pod={os.environ.get('HOSTNAME')})\n"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
