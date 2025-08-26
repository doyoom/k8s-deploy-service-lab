const express = require("express");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();
app.use(express.json());

const BACKEND_URL = process.env.BACKEND_URL || "http://backend:8000";

app.get("/", async (req, res) => {
  try {
    const r = await fetch(`${BACKEND_URL}/api/hello`);
    const data = await r.json();
    console.log(`[FRONTEND] fetched /api/hello ->`, data);
    res.type("html").send(`
      <h1>Frontend</h1>
      <p>Backend says: <pre>${JSON.stringify(data)}</pre></p>
      <form method="post" action="/signup">
        <input name="user" placeholder="user" />
        <input name="pwd" placeholder="pwd" />
        <button>signup</button>
      </form>
      <form method="post" action="/login">
        <input name="user" placeholder="user" />
        <input name="pwd" placeholder="pwd" />
        <button>login</button>
      </form>
    `);
  } catch (e) {
    res.status(500).send(String(e));
  }
});

app.post("/signup", async (req, res) => {
  const body = { user: req.body.user || req.query.user, pwd: req.body.pwd || req.query.pwd };
  const r = await fetch(`${BACKEND_URL}/api/signup`, { method: "POST", headers: {"content-type":"application/json"}, body: JSON.stringify(body)});
  const data = await r.json();
  console.log(`[FRONTEND] -> /api/signup result`, data);
  res.json(data);
});

app.post("/login", async (req, res) => {
  const body = { user: req.body.user || req.query.user, pwd: req.body.pwd || req.query.pwd };
  const r = await fetch(`${BACKEND_URL}/api/login`, { method: "POST", headers: {"content-type":"application/json"}, body: JSON.stringify(body)});
  const data = await r.json();
  console.log(`[FRONTEND] -> /api/login result`, data);
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`[FRONTEND] listening on ${PORT}, BACKEND_URL=${BACKEND_URL}`));
