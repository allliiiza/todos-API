const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data
let todos = [
  { id: 1, task: "Learn Node.js", completed: false, priority: "medium" },
  { id: 2, task: "Build a REST API", completed: false, priority: "medium" },
];

// Question 1: Add a "Priority" Field to the To-Do API
// Update POST /todos to include the "priority" field with a default value of "medium" if not provided
app.post('/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
    completed: false,
    priority: req.body.priority || "medium", // Default priority
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Question 2: Implement a "Complete All" Endpoint
// PUT /todos/complete-all - Mark all to-do items as completed
// This endpoint updates all existing todos by setting "completed" to true
app.put('/todos/complete-all', (req, res) => {
  todos = todos.map(todo => ({ ...todo, completed: true }));
  res.json(todos); // Return the updated list
});

/* 
Question 3: Filter To-Do Items by Completion Status
GET /todos - Retrieve all to-do items or filter by completed status.
After completing this part, you need to comment out the GET endpoint 
already implemented here to test this new GET endpoint! 
*/
app.get('/todos', (req, res) => {
  const { completed } = req.query;
  if (completed !== undefined) {
    const isCompleted = completed === 'true';
    return res.json(todos.filter(todo => todo.completed === isCompleted));
  }
  res.json(todos);
});

// DELETE /todos/:id - Delete a to-do item
// This endpoint removes a to-do item by ID. If the ID doesn't exist, it returns a 404 error
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).send("To-Do item not found");
  }
  todos.splice(index, 1);
  res.status(204).send();
});

// Start the server
// The server will run on http://localhost:3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
