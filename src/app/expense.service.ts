import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http:HttpClient) { }
  getCategories() {
    return this.http.get("https://expense-tracker-api-rosy.vercel.app/categories");
  }
  createAhome(homeId: string): Observable<any> {
    let obj = {'homeId': homeId}
    return this.http.post("https://expense-tracker-api-rosy.vercel.app/createHome", obj);
  }
  joinAhome(homeId: string): Observable<any> {
    let obj = {'homeId': homeId}
    return this.http.post("https://expense-tracker-api-rosy.vercel.app/joinHome", obj);
  }
  postExpense(expenseObj: object): Observable<any> {
    return this.http.post("https://expense-tracker-api-rosy.vercel.app/saveExpense", expenseObj);
  }
  getCatExpense(obj: object): Observable<any> {
    return this.http.post("https://expense-tracker-api-rosy.vercel.app/getCatExpense", obj);
  }
}
