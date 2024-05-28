// Create web server
const express = require('express');
// Create an instance of the express server
const app = express();
// Use the static files in the public directory
app.use(express.static('public'));
// Use the body-parser middleware
app.use(express.json());
// Use the comments router
app.use('/comments', require('./comments'));
// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/');
});

// Path: comments.js
// Create a router
const express = require('express');
const router = express.Router();
// Create an array of comments
let comments = [
  { id: 1, author: 'John Doe', text: 'Hello, world!' },
  { id: 2, author: 'Jane Doe', text: 'Hi, there!' }
];
// GET /comments
router.get('/', (req, res) => {
  res.json(comments);
});
// POST /comments
router.post('/', (req, res) => {
  const { author, text } = req.body;
  comments.push({ id: comments.length + 1, author, text });
  res.status(201).json(comments);
});
// Export the router
module.exports = router;

// Path: public/index.html
<!DOCTYPE html>
<html>
<head>
  <title>Comments</title>
</head>
<body>
  <h1>Comments</h1>
  <ul id="comments"></ul>
  <form id="comment-form">
    <input type="text" name="author" placeholder="Author" required>
    <input type="text" name="text" placeholder="Comment" required>
    <button type="submit">Submit</button>
  </form>
  <script src="app.js"></script>
</body>
</html>

// Path: public/app.js
const comments = document.getElementById('comments');
const form = document.getElementById('comment-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const author = form.author.value;
  const text = form.text.value;
  const response = await fetch('/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ author, text })
  });
  const data = await response.json();
  renderComments(data);
  form.reset();
});
const renderComments = (comments)