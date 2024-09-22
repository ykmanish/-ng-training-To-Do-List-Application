const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const todoController = require("./Controllers/todoController");
const userController = require("./Controllers/userController");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();


app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:4200'
}));
// Todo routes
app.post('/todo', todoController.createTodo);
app.get('/todos', todoController.getTodos);
app.get('/todo/:id', todoController.getTodoById);
app.put('/todo/:id', todoController.updateTodo);
app.delete('/todo/:id', todoController.deleteTodo);

// User routes
app.post('/user', userController.createUser);
app.get('/users', userController.getUsers);
app.get('/user/:id', userController.getUserById);
app.put('/user/:id', userController.updateUser);
app.delete('/user/:id', userController.deleteUser);




app.listen(port, () => {
    // Connect to MongoDB
  mongoose
    .connect(process.env.MongoDbURI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Failed to connect to MongoDB", err);
    });

  console.log(`Server is listening on port ${port}`);
});
