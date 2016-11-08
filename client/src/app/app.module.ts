import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { CalendarComponent } from './calendar/calendar.component';
import { BudgetComponent } from './budget/budget.component';
import { HeaderComponent } from './header/header.component';
import { TodoItemComponent } from './todo/todo-item/todo-item.component';

import {routing} from "./app.routing";
import {TodoService} from "./todo/todo.service";

import {MomentModule} from 'angular2-moment';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    CalendarComponent,
    BudgetComponent,
    HeaderComponent,
    TodoItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MomentModule,
    routing
  ],
  providers: [
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
