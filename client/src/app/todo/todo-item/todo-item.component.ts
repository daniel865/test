import { Component, OnInit } from '@angular/core';
import {Todo} from "../todo.model";
import {TodoService} from "../todo.service";
import {NgForm} from "@angular/forms";
import { UUID } from "angular2-uuid";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  providers: [TodoService]
})
export class TodoItemComponent implements OnInit {

  constructor(private _todoService: TodoService, private _router: Router) { }

  private model = new Todo(UUID.UUID(), '', null, 1478443344);
  private message: string;

  onSubmit(form: NgForm){
    let todo: Observable<Todo[]>;
    todo = this._todoService.addTodo(this.model);

    todo.subscribe(
      todos => {
        this._router.navigate(['/calendar']);
      }
    )


  }

  ngOnInit() {
  }

  ngOnChanges(){
    this.message = 'Todo Added';
  }

}
