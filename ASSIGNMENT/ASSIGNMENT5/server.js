import express from "express";
import cors from "cors";
import { existsSync } from "node:fs";
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const PORT = 5001;
const ROOT = import.meta.dirname;
const FILES_DIR = path.join(ROOT, "files");
const NOTES_DIR = path.join(FILES_DIR, "notes");
const CLIENT_DIR = path.join(ROOT, "search-app", "dist");

// Reads files/notes/<Subject>/<note>.md and writes files/notes.json,
// which Express serves as a plain static file alongside the notes.
async function buildCatalog() {
    const notes = [];
    const subjects = await readdir(NOTES_DIR, { withFileTypes: true });

    for (const subject of subjects.filter((d) => d.isDirectory())) {
        const files = await readdir(path.join(NOTES_DIR, subject.name));

        for (const file of files.filter((f) => !f.startsWith("."))) {
            const filePath = path.join(NOTES_DIR, subject.name, file);
            const text = await readFile(filePath, "utf8");
            const { size, mtime } = await stat(filePath);
            const lines = text.split("\n").map((l) => l.trim());

            const heading = lines.find((l) => l.startsWith("# "));
            const summary = (lines.find((l) => l && !l.startsWith("#")) ?? "").replace(/[`*_]/g, "");

            notes.push({
                id: `${subject.name}/${file}`,
                title: heading ? heading.slice(2) : path.parse(file).name,
                subject: subject.name,
                summary,
                fileName: file,
                url: `/files/notes/${encodeURIComponent(subject.name)}/${encodeURIComponent(file)}`,
                size,
                updated: mtime.toISOString(),
            });
        }
    }

    notes.sort((a, b) => a.subject.localeCompare(b.subject) || a.title.localeCompare(b.title));
    await writeFile(path.join(FILES_DIR, "notes.json"), JSON.stringify(notes, null, 2));
    return notes;
}

const app = express();

app.use(cors());
app.use(
    "/files",
    express.static(FILES_DIR, {
        setHeaders(res, filePath) {
            // Note files always download instead of opening in the browser.
            if (filePath.startsWith(NOTES_DIR)) res.attachment(path.basename(filePath));
        },
    })
);

// Serve the built React app (npm run build) from the same host.
if (existsSync(CLIENT_DIR)) app.use(express.static(CLIENT_DIR));

const notes = await buildCatalog();

app.listen(PORT, (error) => {
    if (error) {
        console.error(`Could not start server on port ${PORT}: ${error.message}`);
        process.exit(1);
    }
    console.log(`Catalogued ${notes.length} notes`);
    console.log(`Server running at http://localhost:${PORT}`);
});
