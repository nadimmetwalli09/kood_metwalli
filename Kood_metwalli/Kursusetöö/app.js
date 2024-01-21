const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/about', requireAuth, (req, res) => {
    res.sendFile(__dirname + '/about.html');
});

app.get('/contact', requireAuth, (req, res) => {
    res.sendFile(__dirname + '/contact.html');
});

app.get('/feedback', requireAuth, (req, res) => {
    res.sendFile(__dirname + '/feedback.html');
});

app.get('/profile', requireAuth, (req, res) => {
    res.sendFile(__dirname + '/profile.html');
});

document.addEventListener("DOMContentLoaded", function () {
    checkAuthStatus();
});

function checkAuthStatus() {
    const userHeader = document.getElementById("user-header");

    // Simulate fetching the username from the server
    fetch('/profile', { method: 'GET' })
        .then(response => response.text())
        .then(data => {
            userHeader.innerText = data;
        })
        .catch(error => {
            console.error('Error fetching username:', error);
        });
}

function registerUser() {
    const username = document.getElementById("reg-username").value;
    const password = document.getElementById("reg-password").value;
    const firstName = document.getElementById("reg-firstname").value;
    const lastName = document.getElementById("reg-lastname").value;
    const age = document.getElementById("reg-age").value;
    const gender = document.getElementById("reg-gender").value;

    // TODO: Send registration data to the server for processing

    // Example: Log the registration details to the console
    console.log("Registration Details:", { username, password, firstName, lastName, age, gender });
}

function loginUser() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    // TODO: Send login data to the server for authentication

    // Example: Log the login details to the console
    console.log("Login Details:", { username, password });
}

function submitFeedback() {
    const feedbackMessage = document.getElementById("feedback-message").value;

    // Display the feedback
    displayFeedback(feedbackMessage);

    // Clear the input field
    document.getElementById("submit-feedback-form").reset();
}

function displayFeedback(feedback) {
    const feedbackDisplay = document.getElementById("feedback-display");
    
    // Create a new paragraph element for the feedback
    const feedbackParagraph = document.createElement("p");
    feedbackParagraph.textContent = feedback;

    // Append the feedback to the display area
    feedbackDisplay.appendChild(feedbackParagraph);
}
