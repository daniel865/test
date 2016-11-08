import { Component, OnInit, OnChanges } from '@angular/core';
import {Todo} from "../todo/todo.model";
import {Observable} from "rxjs";
import {TodoService} from "../todo/todo.service";

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  constructor(private _todoService: TodoService) { }

  /**
   * Array of todos for iterate and used for compute the actual budget
   */
  actualTodos: Todo[];

  /**
   * Initial budget by default its values is 100
   * @type {number}
   */
  initialBudget: number = 100;

  /**
   * Actual budget is initialized to the initial budget
   * @type {number}
   */
  actualBudget: number = this.initialBudget;

  /**
   * When the component is initialized load all the todos and calculate the actual budget
   */
  ngOnInit() {
    let todos: Observable<Todo[]>;
    todos = this._todoService.getTodos();

    todos.subscribe(
      todos => {
        this.actualTodos = todos;
        for (let todo of todos){
          this.actualBudget = this.actualBudget - todo.cost;
        }
      }
    )
  }

  /**
   * When detect a change load all the todos and calculate the actual budget
   */
  ngOnChanges(){
    let todos: Observable<Todo[]>;
    todos = this._todoService.getTodos();

    todos.subscribe(
      todos => {
        this.actualTodos = todos;
        for (let todo of todos){
          this.actualBudget = this.actualBudget - todo.cost;
        }
      }
    )
  }


}
