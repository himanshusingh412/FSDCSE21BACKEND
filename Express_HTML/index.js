import express from 'express';
import fs from 'fs';

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    fs.readFile('pages/home.html', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading home page');
            return;
        }

        res.send(data);
    });
});

app.get('/about', (req, res) => {
    fs.readFile('pages/about.html', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading about page');
            return;
        }

        res.send(data);
    });
});

app.get('/projects', (req, res) => {
    fs.readFile('pages/projects.html', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading projects page');
            return;
        }

        res.send(data);
    });
});

app.get('/contact', (req, res) => {
    fs.readFile('pages/contact.html', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading contact page');
            return;
        }

        res.send(data);
    });
});

app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
