import { useEffect, useRef, useState } from "react";
import "./App.css";

const formatSize = (bytes) =>
  bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} KB`;

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });

function NoteCard({ note }) {
  return (
    <article className="note-card">
      <span className={`subject subject-${note.subject.toLowerCase()}`}>{note.subject}</span>
      <h2>{note.title}</h2>
      <p className="summary">{note.summary}</p>
      <div className="note-footer">
        <span className="meta">
          {formatSize(note.size)} · {formatDate(note.updated)}
        </span>
        <a className="download" href={note.url} download={note.fileName}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3v12m0 0-5-5m5 5 5-5M4 19h16" />
          </svg>
          Download
        </a>
      </div>
    </article>
  );
}

function App() {
  const [notes, setNotes] = useState([]);
  const [status, setStatus] = useState("loading");
  const [searchTerm, setSearchTerm] = useState("");
  const [subject, setSubject] = useState("All");
  const searchRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/files/notes.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setNotes(data);
        setStatus("ready");
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        console.error("Error loading notes:", error);
        setStatus("error");
      });
    return () => controller.abort();
  }, []);

  // Press "/" anywhere to jump to the search bar.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && document.activeElement !== searchRef.current) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const subjects = ["All", ...new Set(notes.map((n) => n.subject))];
  const query = searchTerm.trim().toLowerCase();
  const visible = notes.filter(
    (n) =>
      (subject === "All" || n.subject === subject) &&
      (!query || `${n.title} ${n.summary} ${n.subject}`.toLowerCase().includes(query))
  );

  return (
    <div className="page">
      <header className="hero">
        <h1>Notes Portal App</h1>
        <p>Study notes for FSD, React and JavaScript. Search, filter and download.</p>

        <div className="search">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            ref={searchRef}
            type="search"
            placeholder="Search notes…"
            aria-label="Search notes"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <kbd>/</kbd>
        </div>

        <div className="filters" role="group" aria-label="Filter by subject">
          {subjects.map((s) => (
            <button
              key={s}
              type="button"
              className={s === subject ? "chip active" : "chip"}
              aria-pressed={s === subject}
              onClick={() => setSubject(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </header>

      <main>
        {status === "loading" && <p className="state">Loading notes…</p>}

        {status === "error" && (
          <p className="state error">
            Couldn't load notes. Make sure the server is running (<code>npm start</code> in
            ASSIGNMENT5).
          </p>
        )}

        {status === "ready" && (
          <>
            <p className="count">
              Showing {visible.length} of {notes.length} notes
            </p>
            {visible.length > 0 ? (
              <div className="grid">
                {visible.map((note) => (
                  <NoteCard key={note.id} note={note} />
                ))}
              </div>
            ) : (
              <div className="state">
                <p>No notes match “{searchTerm}”{subject !== "All" && ` in ${subject}`}.</p>
                <button
                  type="button"
                  className="chip"
                  onClick={() => {
                    setSearchTerm("");
                    setSubject("All");
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
