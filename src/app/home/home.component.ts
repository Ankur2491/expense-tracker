import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  masterCategories:Array<any> = [];
  allData: any = {};
  buttonStyles = ["btn btn-xs btn-primary", "btn btn-xs btn-secondary", "btn btn-xs btn-accent"]

constructor(private service: ExpenseService, private _router: Router, private _activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.service.getCategories().subscribe(data=> {
      this.allData = data;
      this.masterCategories = Object.keys(data);
    })
  }
expenseDetails(category: string) {
  this._router.navigate([`${category}/expense-details`], {'state': {'sub': this.allData[category]}});
}
openReminder() {
  this._router.navigate(['reminder']);
}
}
