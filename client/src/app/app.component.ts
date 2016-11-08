import { Component } from '@angular/core';
import {TodoService} from "./todo/todo.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../assets/css/foundation.min.css'],
  providers: [TodoService]
})
export class AppComponent {
  title = 'app works!';
}
