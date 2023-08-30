import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http:HttpClient) { }
  getCategories() {
    return this.http.get("http://localhost:3000/categories");
  }
  createAhome(homeId: string): Observable<any> {
    let obj = {'homeId': homeId}
    return this.http.post("http://localhost:3000/createHome", obj);
  }
  joinAhome(homeId: string): Observable<any> {
    let obj = {'homeId': homeId}
    return this.http.post("http://localhost:3000/joinHome", obj);
  }
  postExpense(expenseObj: object): Observable<any> {
    return this.http.post("http://localhost:3000/saveExpense", expenseObj);
  }
  getCatExpense(obj: object): Observable<any> {
    return this.http.post("http://localhost:3000/getCatExpense", obj);
  }
}
