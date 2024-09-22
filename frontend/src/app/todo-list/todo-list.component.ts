import { Component } from '@angular/core';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoService } from '../todo.service';
import { DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoFormComponent, DatePipe, NgxPaginationModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  isModalVisible = false;
  currentSelectedTodo: any;
  todoData: any = [];
  pageNumber: number = 1;
  pageSize: number = 3;
  searchQuery: string = '';
  constructor(private todoService: TodoService) {}

  fetchTodoData(page = 1, pageSize = 10, searchQuery = '') {
    this.todoService.getAllTodos(searchQuery).subscribe(
      (data) => {
        this.todoData = data.todos;
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  ngOnInit() {
    this.fetchTodoData(this.pageNumber, this.pageSize);
  }

  showModal() {
    this.isModalVisible = true;
  }

  closeModal(isModalVisible: boolean) {
    this.isModalVisible = isModalVisible;
    this.fetchTodoData();
  }

  handleEditTodo(todo: any) {
    this.currentSelectedTodo = todo;
    this.showModal();
  }

  handleDeleteTodo(todoId: string) {
    this.todoService.deleteTodoById(todoId).subscribe(
      (data) => {
        this.fetchTodoData(this.pageNumber, this.pageSize);
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }
  // Triggered when page number changes
  onPageChange(newPageNumber: number) {
    this.pageNumber = newPageNumber;
    this.fetchTodoData(this.pageNumber, this.pageSize);
  }

  // Triggered when page size changes
  onPageSizeChange() {
    this.fetchTodoData(this.pageNumber, this.pageSize);
  }
  onSearchChange() {
    this.fetchTodoData(this.pageNumber, this.pageSize, this.searchQuery);
  }
}
