import { Component, OnInit } from '@angular/core';
import {TodoService} from "../todo/todo.service";
import {Todo} from "../todo/todo.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: []
})
export class CalendarComponent implements OnInit {

  constructor(private _todoService: TodoService) { }

  /**
   * Array of todos to show in the list
   */
  actualTodos: Todo[];

  /**
   * Get all todos and initialize actualTodos
   */
  ngOnInit() {
    let todos: Observable<Todo[]>;
    todos = this._todoService.getTodos();

    todos.subscribe(
      todos => {
        this.actualTodos = todos;
      }
    )
  }

}
