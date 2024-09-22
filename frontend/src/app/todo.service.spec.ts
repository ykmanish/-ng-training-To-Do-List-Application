import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService],
    });
    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create a new todo', () => {
    const todoData = { title: 'New Todo' };
    service.createTodo(todoData).subscribe(response => {
      expect(response).toEqual(todoData);
    });

    const req = httpMock.expectOne('http://localhost:3000/todo');
    expect(req.request.method).toBe('POST');
    req.flush(todoData);
  });

  it('should fetch all todos', () => {
    service.getAllTodos().subscribe(todos => {
      expect(todos.length).toBe(2);
    });

    const req = httpMock.expectOne('http://localhost:3000/todos');
    expect(req.request.method).toBe('GET');
    req.flush([{ title: 'Todo 1' }, { title: 'Todo 2' }]);
  });

  it('should update a todo', () => {
    const todoData = { title: 'Updated Todo' };
    const todoId = '123';
    
    service.updateTodo(todoId, todoData).subscribe(response => {
      expect(response).toEqual(todoData);
    });

    const req = httpMock.expectOne(`http://localhost:3000/todo/${todoId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(todoData);
  });

  it('should delete a todo by ID', () => {
    const todoId = '123';

    service.deleteTodoById(todoId).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`http://localhost:3000/todo/${todoId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
