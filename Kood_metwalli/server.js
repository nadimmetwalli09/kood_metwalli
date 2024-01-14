// server.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

const users = [];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/profile', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

app.get('/contact', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && bcrypt.compareSync(password, user.password));

  if (user) {
    req.session.userId = user.id;
    res.redirect('/profile');
  } else {
    res.redirect('/');
  }
});

app.post('/register', (req, res) => {
  const { username, password, firstName, lastName, age, gender } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = { id: users.length + 1, username, password: hashedPassword, firstName, lastName, age, gender };
  users.push(user);

  req.session.userId = user.id;
  res.redirect('/profile');
});

function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/');
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
