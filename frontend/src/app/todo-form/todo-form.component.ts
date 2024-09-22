import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../user.service';
import { TodoService } from '../todo.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css',
})
export class TodoFormComponent {
  @Output() modelClosed = new EventEmitter<boolean>();
  @Input() todoToEdit: any = null; // Input for editing an existing todo

  // Form fields
  status: string = '';
  priority: string = '';
  dueDate: Date = new Date();
  description: string = '';
  assignTo: string = '';

  users: any[] = [];

  constructor(
    private userService: UserService,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    // Fetch users to assign todos to
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
      console.log('Users:', this.users);
      console.log('Todo to edit:', this.todoToEdit);
    });

    // If a todo is being edited, populate form fields
    if (this.todoToEdit) {
      this.status = this.todoToEdit.status;
      this.priority = this.todoToEdit.priority;
      this.dueDate = new Date(this.todoToEdit.dueDate);
      this.description = this.todoToEdit.description;
      this.assignTo = this.todoToEdit.assignTo._id;
    }
  }

  handleCancel() {
    this.modelClosed.emit(false);
  }

  saveTodo() {
    const newTodo = {
      assignTo: this.assignTo,
      status: this.status,
      priority: this.priority,
      dueDate: this.dueDate,
      description: this.description,
    };

    // If editing, call update API; otherwise, create a new todo
    if (this.todoToEdit) {
      this.todoService.updateTodo(this.todoToEdit._id, newTodo).subscribe(
        (response: any) => {
          console.log('Todo updated successfully:', response);
        },
        (error: any) => {
          console.error('Error updating todo:', error);
        }
      );

    } else {
      this.todoService.createTodo(newTodo).subscribe(
        (response) => {
          console.log('Todo created successfully:', response);
          this.modelClosed.emit(true);
        },
        (error) => {
          console.error('Error creating todo:', error);
        }
      );
    }
    this.handleCancel();

  }
}
