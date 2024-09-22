const Todo = require('../Models/todo'); // Adjust path as necessary
const User = require('../Models/user'); // Adjust path as necessary
// Create a new Todo
exports.createTodo = async (req, res) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Todos
// Get all Todos
exports.getTodos = async (req, res) => {
  try {
    const { search } = req.query; // Get the search query from request

    // Build a search condition if a search query is provided
    let searchCondition = {};
    if (search) {
      const searchRegex = new RegExp(search, 'i'); // Case-insensitive search
      const users = await User.find({ name: searchRegex }); // Assuming you have a User model
      const userIds = users.map(user => user._id);

      searchCondition = {
        $or: [
          { assignTo: { $in: userIds } },  // Search by assigned user ID
          { status: searchRegex },         // Search by status
          { description: searchRegex },    // Search by description
          { priority: searchRegex }        // Search by priority
        ]
      };
    }

    // Fetch todos based on the search condition
    const todos = await Todo.find(searchCondition)
      .populate('assignTo');

    res.status(200).json({
      todos
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get a single Todo by ID
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id).populate('assignTo');
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Todo
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
