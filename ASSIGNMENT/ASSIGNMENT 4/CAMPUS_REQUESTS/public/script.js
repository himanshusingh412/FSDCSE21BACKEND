const API = "/api/requests";

const form = document.getElementById("requestForm");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const message = document.getElementById("message");
const list = document.getElementById("requestList");
const count = document.getElementById("count");

const fields = ["studentName", "email", "category", "description", "priority"];
const STATUSES = ["Pending", "In Progress", "Resolved"];

// id of the request being edited, or null when creating
let editingId = null;
let messageTimer;

function showMessage(text, isError = false) {
  clearTimeout(messageTimer);
  message.textContent = text;
  message.className = "message show " + (isError ? "error" : "success");
  messageTimer = setTimeout(() => message.classList.remove("show"), 3500);
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

function slug(str) {
  return str.toLowerCase().replace(/\s+/g, "-");
}

function timeAgo(iso) {
  if (!iso) return "";
  const secs = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (secs < 60) return "just now";
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short" });
}

// GET all requests
async function loadRequests() {
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error();
    renderRequests(await res.json());
  } catch (err) {
    count.textContent = "";
    list.innerHTML = `
      <div class="empty error">
        <p class="empty-title">Couldn't load requests</p>
        <p>Make sure the server is running, then refresh the page.</p>
      </div>`;
  }
}

function renderRequests(requests) {
  count.textContent = requests.length ? `(${requests.length})` : "";

  if (requests.length === 0) {
    list.innerHTML = `
      <div class="empty">
        <p class="empty-title">No requests yet</p>
        <p>Use the form to report your first campus problem.</p>
      </div>`;
    return;
  }

  const items = requests
    .slice()
    .reverse()
    .map(
      (r, i) => `
      <li class="req ${r.id === editingId ? "editing" : ""}" style="--i:${Math.min(i, 8)}">
        <div class="req-top">
          <span class="req-id">#${r.id}</span>
          <span class="req-cat">${escapeHTML(r.category)}</span>
          <span class="pill ${slug(r.priority)}">${escapeHTML(r.priority)}</span>
          <time class="req-time" datetime="${r.createdAt ?? ""}">${timeAgo(r.createdAt)}</time>
        </div>
        <p class="req-desc">${escapeHTML(r.description)}</p>
        <div class="req-foot">
          <span class="req-who"><strong>${escapeHTML(r.studentName)}</strong> · ${escapeHTML(r.email)}</span>
          <select class="status ${slug(r.status || "Pending")}" aria-label="Status of request #${r.id}"
            onchange="updateStatus(${r.id}, this)">
            ${STATUSES.map((s) => `<option ${s === r.status ? "selected" : ""}>${s}</option>`).join("")}
          </select>
          <button class="btn btn-ghost btn-sm" onclick="startEdit(${r.id})">Edit</button>
          <button class="btn btn-danger-text btn-sm" onclick="deleteRequest(${r.id}, this)">Delete</button>
        </div>
      </li>`
    )
    .join("");

  list.innerHTML = `<ul class="req-list">${items}</ul>`;
}

function setLoading(btn, isLoading, label) {
  btn.disabled = isLoading;
  btn.classList.toggle("loading", isLoading);
  if (label) btn.textContent = label;
}

// Mark empty / bad fields inline before hitting the server
function validateForm() {
  let firstBad = null;
  fields.forEach((f) => {
    const el = document.getElementById(f);
    const bad = !el.checkValidity() || !el.value.trim();
    el.classList.toggle("invalid", bad);
    el.setAttribute("aria-invalid", bad);
    if (bad && !firstBad) firstBad = el;
  });
  if (firstBad) {
    firstBad.focus();
    showMessage(firstBad.id === "email" && firstBad.value ? "Enter a valid email address" : "Please fill in all fields", true);
    return false;
  }
  return true;
}

fields.forEach((f) =>
  document.getElementById(f).addEventListener("input", (e) => {
    e.target.classList.remove("invalid");
    e.target.removeAttribute("aria-invalid");
  })
);

// POST (create) or PUT (update) from the form
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  const body = {};
  fields.forEach((f) => (body[f] = document.getElementById(f).value.trim()));

  const isEdit = editingId !== null;
  const url = isEdit ? `${API}/${editingId}` : API;
  const method = isEdit ? "PUT" : "POST";

  setLoading(submitBtn, true, isEdit ? "Saving…" : "Submitting…");
  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (!res.ok) {
      showMessage(data.message, true);
      return;
    }

    resetForm();
    showMessage(isEdit ? `Request #${data.id} updated` : `Request #${data.id} submitted`);
    loadRequests();
  } catch (err) {
    showMessage("Couldn't reach the server. Try again.", true);
  } finally {
    setLoading(submitBtn, false, editingId !== null ? "Update Request" : "Submit Request");
  }
});

// GET one request, then fill the form to edit it
async function startEdit(id) {
  try {
    const res = await fetch(`${API}/${id}`);
    if (!res.ok) return showMessage("Request not found", true);
    const r = await res.json();

    fields.forEach((f) => {
      const el = document.getElementById(f);
      el.value = r[f];
      el.classList.remove("invalid");
    });
    editingId = id;
    formTitle.textContent = `Edit Request #${id}`;
    submitBtn.textContent = "Update Request";
    cancelBtn.hidden = false;

    document.querySelectorAll(".req.editing").forEach((el) => el.classList.remove("editing"));
    document.querySelector(`[onclick="startEdit(${id})"]`)?.closest(".req")?.classList.add("editing");

    form.scrollIntoView({ behavior: "smooth", block: "start" });
    document.getElementById("studentName").focus({ preventScroll: true });
  } catch (err) {
    showMessage("Couldn't reach the server. Try again.", true);
  }
}

// PUT just the status
async function updateStatus(id, select) {
  const status = select.value;
  select.disabled = true;
  try {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error();
    select.className = `status ${slug(status)}`;
    showMessage(`Request #${id} marked ${status}`);
  } catch (err) {
    showMessage("Couldn't update status", true);
    loadRequests();
  } finally {
    select.disabled = false;
  }
}

// DELETE
async function deleteRequest(id, btn) {
  if (!confirm(`Delete request #${id}? This can't be undone.`)) return;

  setLoading(btn, true);
  try {
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error();
    showMessage(`Request #${id} deleted`);
    if (editingId === id) resetForm();
    loadRequests();
  } catch (err) {
    setLoading(btn, false);
    showMessage("Couldn't delete request", true);
  }
}

function resetForm() {
  form.reset();
  editingId = null;
  formTitle.textContent = "New Request";
  submitBtn.textContent = "Submit Request";
  cancelBtn.hidden = true;
  fields.forEach((f) => document.getElementById(f).classList.remove("invalid"));
  document.querySelectorAll(".req.editing").forEach((el) => el.classList.remove("editing"));
}

cancelBtn.addEventListener("click", resetForm);

loadRequests();
