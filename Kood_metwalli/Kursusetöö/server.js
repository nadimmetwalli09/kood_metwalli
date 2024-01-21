const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
}));


const users = [];


const requireAuth = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};


app.post('/api/register', (req, res) => {
    const { username, password, firstName, lastName, age, gender } = req.body;


    if (users.some(user => user.username === username)) {
        return res.status(400).json({ error: 'Username is already taken' });
    }

  
    const hashedPassword = bcrypt.hashSync(password, 10);

    
    const user = { id: users.length + 1, username, password: hashedPassword, firstName, lastName, age, gender };
    users.push(user);

  
    req.session.userId = user.id;

    res.json({ success: true, user });
});


app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

   
    const user = users.find(user => user.username === username);

    
    if (user && bcrypt.compareSync(password, user.password)) {
        
        req.session.userId = user.id;
        res.json({ success: true, user });
    } else {
        res.status(401).json({ error: 'Invalid username or password' });
    }
});


app.get('/api/profile', requireAuth, (req, res) => {
    const userId = req.session.userId;
    const user = users.find(user => user.id === userId);
    
    if (user) {
        res.json({ success: true, user });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
