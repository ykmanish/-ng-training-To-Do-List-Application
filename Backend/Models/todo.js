const mongoose = require("mongoose");
const UserSchema = require("./user");

const TodoSchema = mongoose.Schema({
  assignTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserSchema,
    required: true,
  },
  status: {
    type: String,
    enum: ["In Progress", "Completed", "Not Started"], 
    required: true,
  },
  priority: {
    type: String,
    enum: ["High", "Low", "Normal"], 
    required: true,
  },
  dueDate: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("todo", TodoSchema);
