/**
 * Created by daniel on 4/11/16.
 */
import {Routes, RouterModule} from '@angular/router';

import { TodoComponent } from "./todo/todo.component";
import { BudgetComponent } from "./budget/budget.component";
import { CalendarComponent } from "./calendar/calendar.component";

const  APP_ROUTES: Routes = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  { path: 'todos', component: TodoComponent },
  { path: 'budget', component: BudgetComponent },
  { path: 'calendar', component: CalendarComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);

