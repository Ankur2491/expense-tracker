import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';
import { LoginComponent } from './login/login.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ReminderDetailsComponent } from './reminder-details/reminder-details.component';

const routes: Routes = [{ path: '', component: LoginComponent }, { path: 'home', component: HomeComponent },
{ path: ':cat/expense-details/addExpense', component: AddExpenseComponent },
{ path: ':cat/expense-details/viewExpense', component: ExpenseDetailsComponent },
{ path: ':cat/expense-details', component: ExpenseDetailsComponent },
{ path: 'reminder', component: ReminderDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
