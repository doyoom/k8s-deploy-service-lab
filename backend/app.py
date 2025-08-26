from flask import Flask, request, jsonify
import os

app = Flask(__name__)

USERS = {}

@app.before_request
def log_request():
    pod = os.environ.get("HOSTNAME", "unknown-pod")
    print(f"[BACKEND] pod={pod} method={request.method} path={request.path} from={request.remote_addr}")

@app.route("/api/hello")
def hello():
    pod = os.environ.get("HOSTNAME", "unknown-pod")
    return jsonify({"message": "hello from backend", "pod": pod})

@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json(force=True)
    user = data.get("user")
    pwd = data.get("pwd")
    if not user or not pwd:
        return jsonify({"ok": False, "error": "user/pwd required"}), 400
    USERS[user] = pwd
    pod = os.environ.get("HOSTNAME", "unknown-pod")
    print(f"[SIGNUP] stored on pod={pod}")
    return jsonify({"ok": True, "stored_on": pod})

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json(force=True)
    user = data.get("user")
    pwd = data.get("pwd")
    ok = (user in USERS and USERS[user] == pwd)
    pod = os.environ.get("HOSTNAME", "unknown-pod")
    return jsonify({"ok": ok, "checked_on": pod})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
