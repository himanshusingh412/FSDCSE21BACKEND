app.get('/about', (req, res) => {
    fs.readFile('pages/about.html', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading about page');
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
});u