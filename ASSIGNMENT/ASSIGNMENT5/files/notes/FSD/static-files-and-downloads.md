# Static Files and Downloads

Express can serve files from a folder and tell the browser to download them instead of opening them.

## Key ideas
- `app.use("/files", express.static("files"))` maps URLs to files on disk.
- The `Content-Disposition: attachment` header triggers a download.
- `res.download(path)` sends a single file as a download.
- In HTML, `<a href="..." download>` asks the browser to save the link target.
