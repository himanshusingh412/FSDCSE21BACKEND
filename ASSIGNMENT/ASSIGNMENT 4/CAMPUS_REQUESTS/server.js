import express from "express";
import fs from "fs";

const app = express();
const PORT = 5002;
const FILE = "requests.json";

app.use(express.json());
app.use(express.static("public"));

// Helpers to read/write requests.json
function readRequests() {
  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, "[]");
  }
  const data = fs.readFileSync(FILE, "utf-8");
  return JSON.parse(data || "[]");
}

function writeRequests(requests) {
  fs.writeFileSync(FILE, JSON.stringify(requests, null, 2));
}

function validate(body) {
  const { studentName, email, category, description, priority } = body;
  if (!studentName || !email || !category || !description || !priority) {
    return "All fields are required";
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return "Invalid email";
  }
  if (!["Low", "Medium", "High"].includes(priority)) {
    return "Priority must be Low, Medium or High";
  }
  return null;
}

// GET all requests
app.get("/api/requests", (req, res) => {
  res.json(readRequests());
});

// GET one request
app.get("/api/requests/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const request = readRequests().find((r) => r.id === id);

  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }
  res.json(request);
});

// POST new request
app.post("/api/requests", (req, res) => {
  const error = validate(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }

  const requests = readRequests();
  const newRequest = {
    // max id + 1 so ids stay unique after deletes
    id: requests.length ? Math.max(...requests.map((r) => r.id)) + 1 : 1,
    studentName: req.body.studentName,
    email: req.body.email,
    category: req.body.category,
    description: req.body.description,
    priority: req.body.priority,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  requests.push(newRequest);
  writeRequests(requests);

  res.status(201).json(newRequest);
});

// PUT update request
app.put("/api/requests/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const requests = readRequests();
  const index = requests.findIndex((r) => r.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Request not found" });
  }

  const updated = { ...requests[index], ...req.body, id };
  const error = validate(updated);
  if (error) {
    return res.status(400).json({ message: error });
  }

  requests[index] = updated;
  writeRequests(requests);

  res.json(updated);
});

// DELETE request
app.delete("/api/requests/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const requests = readRequests();
  const remaining = requests.filter((r) => r.id !== id);

  if (remaining.length === requests.length) {
    return res.status(404).json({ message: "Request not found" });
  }

  writeRequests(remaining);
  res.json({ message: "Request deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
