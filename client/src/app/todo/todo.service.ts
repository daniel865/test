import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { Todo } from "./todo.model";


@Injectable()
export class TodoService {

  private todosUrl = 'http://localhost:3000/api/todos';

  constructor(private _http: Http) { }

  /**
   * Add a new Todo and return an array with all todos
   * @param body Object that contains all data of the todo
   * @returns {Observable<R>} Observable with all todos
   */
  addTodo(body: Object): Observable<Todo[]>{
    const bodyString = JSON.stringify(body);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });

    return this._http.post(this.todosUrl, body, options)
      .map((res: Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  /**
   * Return all todos
   * @returns {Observable<R>} Observable of type
   */
  getTodos(): Observable<Todo[]>{
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    return this._http.get(this.todosUrl, options)
      .map((res: Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  /**
   * update a todo based in its id
   * @param body object that contains todo's information
   * @returns {Observable<R>} Observable with all todos
   */
  updateTodo(body: Object): Observable<Todo[]>{
    const bodyString = JSON.stringify(body);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });

    return this._http.put(`${this.todosUrl}/${body['id']}`, body, options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  /**
   * update a todo based in its id
   * @param id identifier of todo
   * @returns {Observable<R>} Observable with all todos
   */
  removeTodo(id:string): Observable<Comment[]> {
    return this._http.delete(`${this.todosUrl}/${id}`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
